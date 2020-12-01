import { DateStatusEnum } from '../enums/DateStatusEnum';

export interface NewDateDto {
  _id: string;
  inviter: string;
  receiver: string;
  date: number;
  status: DateStatusEnum;
}
