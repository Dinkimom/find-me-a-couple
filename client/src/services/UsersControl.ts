import { EntityEnum } from '../enums/EntityEnum';
import { Filter } from '../types/Filter';
import { AbstractClient } from './AbstractControl';

export class UsersControl extends AbstractClient {
  constructor() {
    super(EntityEnum.Users);
  }

  public getUsers = (filter?: Filter) => {
    return this.axios.get(`/`, { params: filter });
  };
}
