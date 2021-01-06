import { Controller, Get } from '@overnightjs/core';
import { response, Response } from 'express';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractController } from './AbstractController';
import { Request } from 'express';
import { ObjectID } from 'mongodb';
import { getCollection } from '../utils/getCollection';

@Controller('api/users')
export class UsersController extends AbstractController {
  constructor() {
    super(EntityEnum.Users);
  }

  @Get('/')
  private async getUsers(req: any, res: Response) {
    const collection = this.getCollection();

    console.log(req.query);

    let users = await collection
      .find(
        Object.keys(req.query).length
          ? { ...req.query, age: { $gte: Number(req.query.age) || 18 } }
          : undefined
      )
      .toArray();

    users = users.filter(
      (user: any) =>
        user.email !== (req as any).user.email &&
        user.sex !== (req as any).user.sex
    );

    const dates = await getCollection(EntityEnum.Dates).find().toArray();

    users.forEach(async (user) => {
      delete user.password;

      user.isInvited = Boolean(
        dates.filter(
          (item) => item.inviter == req.user._id && item.receiver == user._id
        ).length
      );
    });

    return res.status(200).send({ result: users });
  }

  @Get('/:_id')
  private async getUser(req: Request, res: Response) {
    const _id = new ObjectID(req.params._id);

    const collection = this.getCollection();

    collection.findOne({ _id }, (err, result) => {
      if (result) {
        return res.status(422).send({
          errors: [{ msg: 'Email must be unique', param: 'email' }],
        });
      }

      return res.status(200).send({ result: { [result._id]: result } });
    });
  }
}
