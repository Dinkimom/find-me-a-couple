import { DateStatusEnum } from '../enums/DateStatusEnum';

export interface DateDto {
  _id: string;
  creator_id: string;
  participants: [string, string];
  date: number;
  status: DateStatusEnum;
}
