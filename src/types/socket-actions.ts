import { MessageDto } from 'dtos/MessageDto';
import { UserDto } from 'dtos/UserDto';
import { UsersStateDto } from 'dtos/UsersStateDto';
import { UsersTypingStateDto } from 'dtos/UsersTypingStateDto';

export interface SocketAction<T = unknown> {
    type: string;
    status: 404 | 200 | 201;
    payload: T;
}

export interface NewMessageActionPayload {
    user: UserDto;
    lastMessage: MessageDto;
}

export interface UpdateUsersPayload {
    usersState: UsersStateDto;
}
export interface UpdateUsersTypingStatePayload {
    usersTypingState: UsersTypingStateDto;
}

export interface UpdateUserPayload {
    userState: UsersStateDto;
}

export interface ChatActionPayload {
    lastMessage: MessageDto;
}
