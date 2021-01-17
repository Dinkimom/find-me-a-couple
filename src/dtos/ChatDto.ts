import { MessageDto } from './MessageDto';
import { UserDto } from './UserDto';

export interface ChatDto {
  companion: UserDto;
  lastMessage: MessageDto;
  messages: MessageDto[];
}
