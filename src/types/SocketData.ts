import { ChatDto } from 'dtos/ChatDto';

export interface SocketData {
  status: 404 | 200 | 201;
  result: ChatDto;
}
