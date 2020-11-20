import { DateStatusEnum } from '../enums/DateStatusEnum';
import { UserDto } from './UserDto';

export interface DateDto {
  _id: string;
  inviter: UserDto;
  receiver: UserDto;
  date: number;
  status: DateStatusEnum;
}
