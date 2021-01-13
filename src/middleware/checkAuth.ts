import { noCheckPaths } from '@shared/constants';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { EntityEnum } from '../enums/EntityEnum';
import { getCollection } from '../utils/getCollection';

const secret = process.env.SECRET || '';

export const checkAuth = (req: Request, res: Response, next: any) => {
  const token = (req as any).token;

  if (noCheckPaths.includes(req.path)) {
    return next();
  }

  if (token) {
    const { _id } = jwt.verify(token, secret) as { _id: string };

    const users = getCollection(EntityEnum.Users);

    return users.findOne(
      { _id: new ObjectID(_id) },
      (err: Error, result: any) => {
        if (result) {
          delete result.password;

          (req as any).user = result;
          next();
        }
      }
    );
  }

  return res.status(401).send({ errorMessage: 'Invalid credentials' });
};
