import * as express from 'express';
import { Response, Request } from 'express';
import { ObjectID } from 'mongodb';
import { EntityEnum } from '@enums/EntityEnum';
import { getCollection } from '@utils/getCollection';

export const usersRouter = express.Router();

const entity = EntityEnum.Users;

usersRouter.get('/', async (req: any, res: Response) => {
  const collection = getCollection(entity);

  const filter: any = {
    email: { $ne: req.user.email },
  };

  const filterKeys = Object.keys(req.query);

  if (filterKeys.length) {
    filterKeys.forEach((key) => {
      if (key === 'sex') {
        filter[key] = Number(req.query[key]);
      } else {
        filter[key] = { $gte: Number(req.query[key]) };
      }
    });
  }

  const users = await collection.find(filter).toArray();

  const dates = await getCollection(EntityEnum.Dates).find().toArray();

  users.forEach((user) => {
    delete user.password;

    user.isInvited = Boolean(
      dates.filter(
        (item) => item.inviter == req.user._id && item.receiver == user._id
      ).length
    );
  });

  return res.status(200).send({ result: users });
});

usersRouter.get('/:_id', (req: Request, res: Response) => {
  const _id = new ObjectID(req.params._id);

  const collection = getCollection(entity);

  collection.findOne({ _id }, (err, result) => {
    if (result) {
      return res.status(422).send({
        errors: [{ msg: 'Email must be unique', param: 'email' }],
      });
    }

    return res.status(200).send({ result: { [result._id]: result } });
  });
});
