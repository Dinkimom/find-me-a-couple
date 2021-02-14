import { MessageDto } from 'dtos/MessageDto';
import { UserDto } from 'dtos/UserDto';

export interface SocketAction<T = unknown> {
    type: string;
    status: 404 | 200 | 201;
    result: T;
}

export interface NewMessageActionPayload {
    user: UserDto;
    lastMessage: MessageDto;
}

export interface ChatActionPayload {
    lastMessage: MessageDto;
}
