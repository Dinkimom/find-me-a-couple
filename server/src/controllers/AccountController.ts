import {
  ClassMiddleware,
  Controller,
  Get,
  Middleware,
  Post,
  Put,
} from '@overnightjs/core';
import { JwtManager } from '@overnightjs/jwt';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { server } from '../start';
import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { AbstractController } from './AbstractController';
const jwt = require('jsonwebtoken');

const bearerToken = require('express-bearer-token');

@Controller('api/account')
@ClassMiddleware([cors()])
export class AccountController extends AbstractController {
  constructor() {
    super('Users');
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
        if (err) {
          return res.status(400).json({ err });
        }

        if (result) {
          const token = jwt.sign({ ...req.body }, 'shhhhh');

          return res.status(200).send({ result: { token } });
        }

        return res.status(401).send({ errorMessage: 'Invalid credentials' });
      });
    }
  }

  @Post('register')
  @Middleware([
    check('name', 'Name is a required field').not().isEmpty(),
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

      collection.insertOne({ ...req.body }, (err, result) => {
        if (err) {
          return res.status(400).json({ err });
        }

        const token = JwtManager.jwt({ ...req.body });

        return res.status(200).send({ result: { token } });
      });
    }
  }

  @Get('info')
  @Middleware([bearerToken()])
  private getInfo(req: any, res: Response) {
    if (req.token) {
      const collection = this.getCollection();

      const { email, password } = jwt.verify(req.token, 'shhhhh');

      collection.findOne({ email, password }, (err, result) => {
        if (err) {
          return res.status(400).json({ err });
        }

        if (result) {
          return res.status(200).json({ result });
        }

        return res.status(401).send({ errorMessage: 'Invalid credentials' });
      });
    } else {
      return res.status(401).send({ errorMessage: 'Invalid credentials' });
    }
  }
}
