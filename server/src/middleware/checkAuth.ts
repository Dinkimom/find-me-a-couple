import { Request, Response } from 'express';
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
    console.log(token);

    const { email, password } = jwt.verify(token, secret);

    const users = getCollection(EntityEnum.Users);

    return users.findOne({ email, password }, (err, result) => {
      if (result) {
        (req as any).user = result;
        next();
      }
    });
  }

  return res.status(401).send({ errorMessage: 'Invalid credentials' });
};
