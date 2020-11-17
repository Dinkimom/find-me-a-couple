import { Controller, Get } from '@overnightjs/core';
import { Response } from 'express';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractController } from './AbstractController';
import { Request } from 'express';

@Controller('api/users')
export class UsersController extends AbstractController {
  constructor() {
    super(EntityEnum.Users);
  }

  @Get('/')
  private async getUsers(req: Request, res: Response) {
    let users = await this.getCollection()
      .find(
        req.query
          ? { ...req.query, age: { $gte: Number(req.query.age) || 18 } }
          : undefined
      )
      .toArray();

    users = users.filter((user: any) => user.email !== (req as any).user.email);

    users.forEach((user) => {
      delete user.password;
    });

    return res.status(200).send({ result: users });
  }
}
