import { LoginDto } from '../dtos/LoginDto';
import { RegisterDto } from '../dtos/RegisterDto';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractControl } from './AbstractControl';

export class AccountControl extends AbstractControl {
  constructor() {
    super(EntityEnum.Account);
  }

  public login = (data: LoginDto) => {
    return this.axios.put('/login', data);
  };

  public register = (data: RegisterDto) => {
    return this.axios.post('/register', data);
  };

  public update = (id: string, data: RegisterDto) => {
    return this.axios.put(`/update/${id}`, data);
  };

  public remove = (id: string) => {
    return this.axios.delete(`/delete/${id}`);
  };

  public check = () => {
    return this.axios.get('/');
  };
}
