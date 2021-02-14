import { MessageDto } from 'dtos/MessageDto';
import { NewMessageDto } from 'dtos/NewMessageDto';
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
};
