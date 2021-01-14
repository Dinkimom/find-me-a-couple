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

  const user_id = String((req as any).user._id);

  const chats = await collection
    .find({ participants: { $all: [user_id] } })
    .toArray();

  const completeChats: ChatsDto = [];

  const usersCollection = getCollection(EntityEnum.Users);

  const users = await usersCollection.find({}).toArray();

  chats.forEach((chat) => {
    const companionId = chat.participants.find(
      (userId: string) => userId !== user_id
    );

    const companion = users.find(
      (item) => String(item._id) === String(companionId)
    );

    if (companion && chat.messages.length) {
      completeChats.push({
        companion: {
          _id: companionId,
          name: companion.name,
          image: companion.image,
        },
        lastMessage: chat.messages[chat.messages.length - 1],
        messages: chat.messages,
      });
    }
  });

  res.status(200).send({ result: completeChats });
});

chatsRouter.get('/:receiver', async (req: Request, res: Response) => {
  const { receiver } = req.params;

  const user_id = String((req as any).user._id);

  if (receiver === user_id) {
    return res.status(404).send();
  }

  const collection = getCollection(entity);

  let chat = await collection.findOne({
    participants: { $all: [receiver, user_id] },
  });

  if (!chat) {
    await collection.insertOne({
      participants: [receiver, user_id],
      messages: [],
    });

    chat = await collection.findOne({
      participants: { $all: [receiver, user_id] },
    });
  }

  const usersCollection = getCollection(EntityEnum.Users);

  try {
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
  } catch {
    res.status(404).send();
  }
});

chatsRouter.post('/:receiver', async (req: Request, res: Response) => {
  const { receiver } = req.params;

  const user_id = String((req as any).user._id);

  const collection = getCollection(entity);

  const chat = (
    await collection
      .find({ participants: { $all: [receiver, user_id] } })
      .toArray()
  )[0];

  if (chat) {
    const { messages } = chat;

    messages.push({ user_id, ...req.body });

    collection.updateOne(
      { participants: { $all: [receiver, user_id] } },
      { $set: { messages } }
    );

    res.status(200).send();
  }

  res.status(404).send();
});
