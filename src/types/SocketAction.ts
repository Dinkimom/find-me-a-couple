import { MessageDto } from 'dtos/MessageDto';
import { UserDto } from 'dtos/UserDto';

export interface SocketAction<T = unknown> {
    type: string;
    status: 404 | 200 | 201;
    result: T;
}

export interface NewMessageActionPayload {
    user: UserDto;
    message: MessageDto;
}

export interface ChatActionPayload {
    receiver: string;
}
