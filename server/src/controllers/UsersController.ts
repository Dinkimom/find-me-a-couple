import { Controller, Get } from '@overnightjs/core';
import { Response } from 'express';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractController } from './AbstractController';

@Controller('api/users')
export class UsersController extends AbstractController {
  constructor() {
    super(EntityEnum.Users);
  }

  @Get('/')
  private async getUsers(req: any, res: Response) {
    let users = await this.getCollection()
      .find({ ...req.body, age: { $gte: req.body.age || 18 } })
      .toArray();

    users = users.filter((user: any) => user.email !== req.user.email);

    users.forEach((user) => {
      delete user.password;
    });

    return res.status(200).send({ result: users });
  }
}
