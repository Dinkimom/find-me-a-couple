import { NewMessageDto } from 'dtos/NewMessageDto';
import { ActionCreator } from 'types/ActionCreator';
import { ChatActionType } from './ChatActionType';

export const chatActions = {
    sendMessage(user_id: string, receiver: string, message: NewMessageDto) {
        return JSON.stringify({
            user_id,
            type: ChatActionType.CHAT_SEND_MESSAGE,
            payload: {
                receiver,
                message,
            },
        });
    },
    getUsers(user_id: string, users: string[]) {
        return JSON.stringify({
            user_id,
            type: ChatActionType.GET_USERS,
            payload: {
                users,
            },
        });
    },
    updateUsers(user_id: string, users: string[]) {
        return JSON.stringify({
            user_id,
            type: ChatActionType.UPDATE_USERS,
            payload: {
                users,
            },
        });
    },
};
