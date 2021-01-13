import * as express from 'express';
import { Response } from 'express';
import { EntityEnum } from 'src/enums/EntityEnum';
import { getCollection } from 'src/utils/getCollection';

export const datesRouter = express.Router();

const entity = EntityEnum.Dates;

datesRouter.get('/', async (req: any, res: Response) => {
  const dates = await getCollection(entity).find().toArray();

  let list = dates.filter(
    (item) => item.inviter == req.user._id || item.receiver == req.user._id
  );

  const users = await getCollection(entity).find().toArray();

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
