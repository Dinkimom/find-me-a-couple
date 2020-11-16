import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { EntityEnum } from '../enums/EntityEnum';
import { Filter } from '../types/Filter';
import { AbstractClient } from './AbstractControl';

export class AccountControl extends AbstractClient {
  constructor() {
    super(EntityEnum.Account);
  }

  public login = (data: LoginDto) => {
    return this.axios.put('/login', data);
  };

  public register = (data: RegisterDto) => {
    return this.axios.post('/register', data);
  };

  public getInfo = () => {
    return this.axios.get('info');
  };
}
