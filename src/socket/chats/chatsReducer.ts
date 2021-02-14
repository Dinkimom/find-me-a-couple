import { fetchChats } from 'features/chat/chatsSlice';
import { ChatActionType } from 'socket/chat/ChatActionType';
import { SocketReducer } from 'types/SocketReducer';

export const chatsReducer: SocketReducer<void> = ({ action, dispatch }) => {
    switch (action.type) {
        case ChatActionType.CHAT_SEND_MESSAGE:
        case ChatActionType.UPDATE_CHAT:
        case ChatActionType.MESSAGE_RECEIVED:
            dispatch(fetchChats(true));
            break;
    }
};
