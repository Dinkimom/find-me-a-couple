import { noCheckPaths } from '@shared/constants';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { EntityEnum } from '../enums/EntityEnum';
import { getCollection } from '../utils/getCollection';

export const secret = 'shhhhh';

export const checkAuth = (req: Request, res: Response, next: any) => {
  const token = (req as any).token;

  if (
    noCheckPaths.filter(
      (path) => path.url === req.url && path.method === req.method
    ).length
  ) {
    return next();
  }

  if (token) {
    try {
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
    } catch {
      return res.status(401).send({ errorMessage: 'Invalid credentials' });
    }
  }

  return res.status(401).send({ errorMessage: 'Invalid credentials' });
};
