import { ChatsDto } from '@dtos/ChatsDto';
import * as express from 'express';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { EntityEnum } from 'src/enums/EntityEnum';
import { getCollection } from 'src/utils/getCollection';

export const chatsRouter = express.Router();

const entity = EntityEnum.Chats;

chatsRouter.get('/', async (req: Request, res: Response) => {
  const collection = getCollection(entity);

  const chats = await collection
    .find({ participants: { $all: [(req as any).user._id] } })
    .toArray();

  const completeChats: ChatsDto = [];

  chats.forEach(async (chat) => {
    const companionId = chat.participants.filter(
      (userId: string) => userId !== (req as any).user._id
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

chatsRouter.get('/:receiver', async (req: Request, res: Response) => {
  const { receiver } = req.params;

  if (receiver === (req as any).user._id) {
    return res.status(404).send();
  }

  let collection = getCollection(entity);

  const chat = (
    await collection
      .find({ participants: { $all: [receiver, (req as any).user._id] } })
      .toArray()
  )[0];

  if (chat) {
    return collection.insertOne({
      participants: [receiver, (req as any).user._id],
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

chatsRouter.post('/:receiver', async (req: Request, res: Response) => {
  const { receiver } = req.params;

  const collection = getCollection(entity);

  const chat = (
    await collection
      .find({ participants: { $all: [receiver, (req as any).user._id] } })
      .toArray()
  )[0];

  if (chat) {
    const { messages } = chat;

    messages.push({ user_id: (req as any).user._id, ...req.body });

    collection.updateOne(
      { participants: { $all: [receiver, (req as any).user._id] } },
      { $set: { messages } }
    );

    res.status(200).send();
  }

  res.status(404).send();
});
