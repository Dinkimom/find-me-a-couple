import { DateDto } from '@dtos/DateDto';
import { DateStatusEnum } from '@enums/DateStatusEnum';
import { EntityEnum } from '@enums/EntityEnum';
import { getCollection } from '@utils/getCollection';
import * as express from 'express';
import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';

export const datesRouter = express.Router();

const entity = EntityEnum.Dates;

datesRouter.get('/', async (req: any, res: Response) => {
  const collection = getCollection(entity);

  const dates = await getCollection(EntityEnum.Dates).find().toArray();

  let list = dates.filter(
    (item) => item.inviter == req.user._id || item.receiver == req.user._id
  );

  const users = await getCollection(EntityEnum.Users).find().toArray();

  list.filter((item) => item.inviter == req.user._id);

  users.forEach((item) => delete item.password);

  list = list.map((item) => ({
    ...item,
    inviter: users.filter((user) => item.inviter == user._id)[0],
    receiver: users.filter((user) => item.receiver == user._id)[0],
  }));

  list = list.filter((item) => item.receiver && item.inviter);

  return res.status(200).send({ result: list });
});

datesRouter.post('/', (req: Request<DateDto>, res: Response) => {
  const collection = getCollection(entity);

  collection.insertOne({ ...req.body, status: DateStatusEnum.Opened }, () => {
    return res.status(200).send();
  });
});

datesRouter.put('/:_id', (req: Request<Partial<DateDto>>, res: Response) => {
  const _id = new ObjectID(req.params._id);

  const collection = getCollection(entity);

  collection.findOneAndUpdate({ _id }, { $set: { ...req.body } }, () => {
    return res.status(200).send();
  });
});

datesRouter.delete('/:_id', (req: Request, res: Response) => {
  const _id = new ObjectID(req.params._id);

  const collection = getCollection(entity);

  collection.findOneAndDelete({ _id }, () => {
    return res.status(200).send();
  });
});
