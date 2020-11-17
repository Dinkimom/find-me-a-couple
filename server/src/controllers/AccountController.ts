import { Controller, Get, Middleware, Post, Put } from '@overnightjs/core';
import { JwtManager } from '@overnightjs/jwt';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { EntityEnum } from '../enums/EntityEnum';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { AbstractController } from './AbstractController';
import { secret } from '../constants/secret';
const jwt = require('jsonwebtoken');

@Controller('api/account')
export class AccountController extends AbstractController {
  constructor() {
    super(EntityEnum.Users);
  }

  @Put('login')
  @Middleware([
    check('email').isEmail(),
    check('password', 'Password is a required field').not().isEmpty(),
  ])
  private login(req: Request<LoginDto>, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errorMessage: 'Invalid form data',
        errors: errors.array(),
      });
    } else {
      const collection = this.getCollection();

      collection.findOne({ ...req.body }, (err, result) => {
        if (result) {
          const token = jwt.sign({ ...req.body }, secret);

          delete result.password;

          return res.status(200).send({ result: { token, user: result } });
        }

        return res
          .status(403)
          .send({ errorMessage: 'Invalid email or password' });
      });
    }
  }

  @Post('register')
  @Middleware([
    check('name', 'Name is a required field').not().isEmpty(),
    check('phone').isMobilePhone('ru-RU'),
    check('email').isEmail(),
    check('password', 'Password is a required field').not().isEmpty(),
  ])
  private register(req: Request<RegisterDto>, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({
        errorMessage: 'Invalid form data',
        errors: errors.array(),
      });
    } else {
      const collection = this.getCollection();

      collection.findOne({ email: req.body.email }, (err, result) => {
        if (result) {
          return res.status(403).send({
            errors: [{ msg: 'Email must be unique', param: 'email' }],
          });
        }

        collection.insertOne({ ...req.body }, (err, result) => {
          const token = JwtManager.jwt({ ...req.body });

          return res
            .status(200)
            .send({ result: { token, user: result.ops[0] } });
        });
      });
    }
  }

  @Get('info')
  private getInfo(req: any, res: Response) {
    return res.status(200).send({ result: { user: req.user } });
  }

  @Get('users')
  private async getUsers(req: any, res: Response) {
    let users = await this.getCollection().find().toArray();

    users = users.filter((user: any) => user.email !== req.user.email);

    return res.status(200).send({ result: users });
  }
}
