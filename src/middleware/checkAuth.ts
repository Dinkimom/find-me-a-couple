import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import { noCheckPaths } from '../constants/noCheckPaths';
import { secret } from '../constants/secret';
import { EntityEnum } from '../enums/EntityEnum';
import { getCollection } from '../utils/getCollection';
const jwt = require('jsonwebtoken');

export const checkAuth = (req: Request, res: Response, next: Function) => {
  const token = (req as any).token;

  if (noCheckPaths.includes(req.path)) {
    return next();
  }

  if (token) {
    const { _id } = jwt.verify(token, secret);

    const users = getCollection(EntityEnum.Users);

    return users.findOne({ _id: new ObjectID(_id) }, (err, result) => {
      if (result) {
        delete result.password;

        (req as any).user = result;
        next();
      }
    });
  }

  return res.status(401).send({ errorMessage: 'Invalid credentials' });
};
