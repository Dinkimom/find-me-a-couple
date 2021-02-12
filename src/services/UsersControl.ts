import { AxiosResponse } from 'axios';
import { EntityEnum } from 'enums/EntityEnum';
import { Filter } from 'types/Filter';
import { AbstractControl } from './AbstractControl';

export class UsersControl extends AbstractControl {
    constructor() {
        super(EntityEnum.Users);
    }

    public getUsers = (filter?: Filter): Promise<AxiosResponse> => {
        return this.axios.get('/', { params: filter });
    };
}
