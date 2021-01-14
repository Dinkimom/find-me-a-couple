import { MessageDto } from '@dtos/MessageDto';
import { UserRequest } from '@types/UserRequest';
import * as express from 'express';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { EntityEnum } from 'src/enums/EntityEnum';
import { getCollection } from 'src/utils/getCollection';

export const chatsRouter = express.Router();

const entity = EntityEnum.Chats;

chatsRouter.get('/', async (req: UserRequest, res: Response) => {
  const collection = getCollection(entity);

  const chats = await collection
    .find({ participants: { $all: [user_id] } })
    .toArray();

  const completeChats = [];

  chats.forEach(async (chat) => {
    const companionId = chat.participants.filter(
      (userId: string) => userId !== req.user._id
    )[0];

    const usersCollection = getCollection(EntityEnum.Users);

    const companion = await usersCollection.findOne({
      _id: new ObjectId(companionId),
    });

    if (companion) {
      completeChats.push({
        companion,
        lastMessage: chat.messages[chat.messages.length - 1],
        messages: chat.messages,
      });
    }
  });

  res.status(200).send({ result: completeChats });
});

chatsRouter.get('/:receiver', async (req: UserRequest, res: Response) => {
  const { receiver } = req.params;

  if (receiver === req.user._id) {
    return res.status(404).send();
  }

  let collection = getCollection(entity);

  const chat = (
    await collection
      .find({ participants: { $all: [receiver, req.user._id] } })
      .toArray()
  )[0];

  if (chat) {
    return collection.insertOne({
      participants: [receiver, req.user._id],
      messages: [],
    });
  }

  collection = getCollection(entity);

  const usersCollection = getCollection(EntityEnum.Users);

  const userId = new ObjectId(receiver);

  const user = await usersCollection.findOne({ _id: userId });

  if (user) {
    res.status(200).send({
      result: {
        companion: { name: user.name, image: user.image },
        lastMessage: chat.messages[chat.messages.length - 1],
        messages: chat.messages,
      },
    });
  } else {
    res.status(404).send();
  }
});

chatsRouter.post(
  '/:receiver',
  async (req: UserRequest<MessageDto>, res: Response) => {
    const { receiver } = req.params;

    const collection = getCollection(entity);

    const chat = (
      await collection
        .find({ participants: { $all: [receiver, req.user._id] } })
        .toArray()
    )[0];

    if (chat) {
      const { messages } = chat;

      messages.push({ user_id: req.user._id, ...req.body });

      collection.updateOne(
        { participants: { $all: [receiver, req.user._id] } },
        { $set: { messages } }
      );

      res.status(200).send();
    }

    res.status(404).send();
  }
);
