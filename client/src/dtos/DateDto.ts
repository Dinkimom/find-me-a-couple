import { DateStatusEnum } from '../enums/DateStatusEnum';
import { UserDto } from './UserDto';

export interface DateDto {
  _id: string;
  creator_id: string;
  participants: [string, string];
  date: string;
  status: DateStatusEnum;
}
