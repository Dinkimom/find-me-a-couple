import { AxiosResponse } from 'axios';
import { DateDto } from 'dtos/DateDto';
import { NewDateDto } from 'dtos/NewDateDto';
import { EntityEnum } from 'enums/EntityEnum';
import { AbstractControl } from './AbstractControl';

export class DatesControl extends AbstractControl {
    constructor() {
        super(EntityEnum.Dates);
    }

    public getDates = (): Promise<AxiosResponse> => {
        return this.axios.get('/');
    };

    public create = (data: NewDateDto): Promise<AxiosResponse> => {
        return this.axios.post('/', data);
    };

    public update = (id: string, data: Partial<DateDto>): Promise<AxiosResponse> => {
        return this.axios.put(`/${id}`, data);
    };

    public remove = (id: string): Promise<AxiosResponse> => {
        return this.axios.delete(`/${id}`);
    };
}
