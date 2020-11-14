import { AccountController } from '../src/controllers/AccountController';

export const authCheck = (res: Response, req: any, next: Function) => {
  const accounts = new AccountController().getAccountsCollection();

  const token = req.token;

  console.log(token);

  next();
};
