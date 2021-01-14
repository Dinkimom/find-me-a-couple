import { MessageDto } from './MessageDto';
import { UserDto } from './UserDto';

export interface ChatDto {
  companion: Partial<UserDto>;
  lastMessage: MessageDto;
  messages: MessageDto[];
}
