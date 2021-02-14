import { updateChatHistory } from 'features/chat/chatsSlice';
import { ChatActionPayload, NewMessageActionPayload } from 'types/SocketAction';
import { SocketReducer } from 'types/SocketReducer';
import { ChatActionType } from './ChatActionType';

export const chatReducer: SocketReducer<ChatActionPayload & NewMessageActionPayload> = ({ action, dispatch }) => {
    switch (action.type) {
        case ChatActionType.UPDATE_CHAT:
        case ChatActionType.MESSAGE_RECEIVED:
            dispatch(updateChatHistory(action.result.lastMessage));
            break;
    }
};
