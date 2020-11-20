import { DateStatusEnum } from '../enums/DateStatusEnum';
import { UserDto } from './UserDto';

export interface DateDto {
  _id: string;
  inviter: string;
  receiver: UserDto;
  date: number;
  status: DateStatusEnum;
}