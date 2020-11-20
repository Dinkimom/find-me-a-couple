import { DateDto } from '../dtos/DateDto';
import { EntityEnum } from '../enums/EntityEnum';
import { AbstractControl } from './AbstractControl';

export class DatesControl extends AbstractControl {
  constructor() {
    super(EntityEnum.Dates);
  }

  public getDates = () => {
    return this.axios.get('/');
  };

  public create = (data: DateDto) => {
    return this.axios.post('/', data);
  };

  public update = (id: string, data: Partial<DateDto>) => {
    return this.axios.put(`/${id}`, data);
  };

  public remove = (id: string) => {
    return this.axios.delete(`/${id}`);
  };
}
