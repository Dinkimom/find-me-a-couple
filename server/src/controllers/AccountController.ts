import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
  Put,
} from '@overnightjs/core';
import { JwtManager } from '@overnightjs/jwt';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { EntityEnum } from '../enums/EntityEnum';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { AbstractController } from './AbstractController';
import { secret } from '../constants/secret';
import { ObjectID } from 'mongodb';
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
          const token = jwt.sign({ _id: result._id }, secret);

          delete result.password;

          return res.status(200).send({ result: { token, user: result } });
        }

        return res
          .status(422)
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
          return res.status(422).send({
            errors: [{ msg: 'Email must be unique', param: 'email' }],
          });
        }

        collection.insertOne({ ...req.body }, (err, result) => {
          const token = jwt.sign({ _id: result.ops[0]._id }, secret);

          return res
            .status(200)
            .send({ result: { token, user: result.ops[0] } });
        });
      });
    }
  }

  @Put('update/:_id')
  @Middleware([
    check('phone').optional().isMobilePhone('ru-RU'),
    check('email').optional().isEmail(),
  ])
  private async update(req: Request<RegisterDto>, res: Response) {
    const errors = validationResult(req);
    const _id = new ObjectID((req.params as any)._id);

    if (!errors.isEmpty()) {
      return res.status(422).send({
        errorMessage: 'Invalid form data',
        errors: errors.array(),
      });
    } else {
      const collection = this.getCollection();

      const isValid =
        (await collection
          .find({ _id: { $ne: _id }, email: req.body.email })
          .count()) > 0
          ? false
          : true;

      if (!isValid) {
        return res.status(422).send({
          errors: [{ msg: 'Email must be unique', param: 'email' }],
        });
      }

      collection.findOneAndUpdate(
        { _id },
        { $set: { ...req.body } },
        { returnOriginal: false },
        (err, { value }) => {
          const token = jwt.sign({ _id: value._id }, secret);

          delete value.password;

          return res.status(200).send({ result: { token, user: value } });
        }
      );
    }
  }

  @Delete('delete/:_id')
  private delete(req: Request<LoginDto>, res: Response) {
    const _id = new ObjectID((req.params as any)._id);

    const collection = this.getCollection();

    collection.findOneAndDelete({ _id }, (err, result) => {
      if (result) {
        return res.status(200).send();
      }
    });
  }

  @Get('/')
  private getInfo(req: any, res: Response) {
    return res.status(200).send({ result: { user: req.user } });
  }
}
