import { AxiosResponse } from 'axios';
import { LoginDto } from 'dtos/LoginDto';
import { RegisterDto } from 'dtos/RegisterDto';
import { EntityEnum } from 'enums/EntityEnum';
import { AbstractControl } from './AbstractControl';

export class AccountControl extends AbstractControl {
    constructor() {
        super(EntityEnum.Account);
    }

    public login = (data: LoginDto): Promise<AxiosResponse> => {
        return this.axios.put('/', data);
    };

    public register = (data: RegisterDto): Promise<AxiosResponse> => {
        return this.axios.post('/', data);
    };

    public update = (id: string, data: RegisterDto): Promise<AxiosResponse> => {
        return this.axios.put(`/${id}`, data);
    };

    public remove = (id: string): Promise<AxiosResponse> => {
        return this.axios.delete(`/${id}`);
    };

    public check = (): Promise<AxiosResponse> => {
        return this.axios.get('/');
    };
}
