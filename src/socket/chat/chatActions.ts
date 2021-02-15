import { NewMessageDto } from 'dtos/NewMessageDto';
import { ActionCreator } from 'types/ActionCreator';
import { ChatActionType } from './ChatActionType';

export const chatActions: ActionCreator = {
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
};
