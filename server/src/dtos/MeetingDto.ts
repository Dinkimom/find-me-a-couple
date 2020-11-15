import { MeetingStatusEnum } from 'src/constants/MeetingStatusEnum';

export interface MeetingDto {
  party: string[];
  date: Date;
  status: MeetingStatusEnum;
}
