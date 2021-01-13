import { LoginDto } from '@dtos/LoginDto';
import { RegisterDto } from '@dtos/RegisterDto';
import { EntityEnum } from '@enums/EntityEnum';
import { getCollection } from '@utils/getCollection';
import * as express from 'express';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';

export const accountRouter = express.Router();

const secret = process.env.SECRET || '';

const entity = EntityEnum.Users;

accountRouter.put(
  'login',
  [
    check('email').isEmail(),
    check('password', 'Password is a required field').not().isEmpty(),
  ],
  (req: Request<LoginDto>, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errorMessage: 'Invalid form data',
        errors: errors.array(),
      });
    } else {
      const collection = getCollection(entity);

      collection.findOne({ ...req.body }, (err: Error, result: any) => {
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
);

accountRouter.post(
  'register',
  check('name', 'Name is a required field').not().isEmpty(),
  check('phone').isMobilePhone('ru-RU'),
  check('email').isEmail(),
  check('password', 'Password is a required field').not().isEmpty(),
  (req: Request<RegisterDto>, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({
        errorMessage: 'Invalid form data',
        errors: errors.array(),
      });
    } else {
      const collection = getCollection(entity);

      collection.findOne({ email: req.body.email }, (err, result) => {
        if (result) {
          return res.status(422).send({
            errors: [{ msg: 'Email must be unique', param: 'email' }],
          });
        }

        collection.insertOne(
          { ...req.body, sex: Number(req.body.sex) },
          (err, result) => {
            const token = jwt.sign({ _id: result.ops[0]._id }, secret);

            return res
              .status(200)
              .send({ result: { token, user: result.ops[0] } });
          }
        );
      });
    }
  }
);

accountRouter.put(
  'update/:_id',
  [
    check('phone').optional().isMobilePhone('ru-RU'),
    check('email').optional().isEmail(),
  ],
  async (req: Request<RegisterDto>, res: Response) => {
    const errors = validationResult(req);
    const _id = new ObjectID((req.params as any)._id);

    if (!errors.isEmpty()) {
      return res.status(422).send({
        errorMessage: 'Invalid form data',
        errors: errors.array(),
      });
    } else {
      const collection = getCollection(entity);

      if (req.body.sex) {
        req.body.sex = Number(req.body.sex);
      }

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
);

accountRouter.delete('delete/:_id', (req: Request<LoginDto>, res: Response) => {
  const _id = new ObjectID((req.params as any)._id);

  const collection = getCollection(entity);

  collection.findOneAndDelete({ _id }, (err, result) => {
    if (result) {
      return res.status(200).send();
    }
  });
});

accountRouter.get('/', (req: any, res: Response) => {
  return res.status(200).send({ result: { user: req.user } });
});
