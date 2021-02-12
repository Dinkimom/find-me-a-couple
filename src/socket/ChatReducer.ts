import { fetchChat } from 'features/chat/chatsSlice';
import { ChatActionPayload, NewMessageActionPayload } from 'types/SocketAction';
import { SocketReducer } from 'types/SocketReducer';
import { SocketActionType } from './types/SocketActionType';

export const chatReducer: SocketReducer<ChatActionPayload & NewMessageActionPayload> = ({ action, dispatch }) => {
    switch (action.type) {
        case SocketActionType.CHAT:
            dispatch(fetchChat(action.result.receiver, true));
            break;

        case SocketActionType.NEW_MESSAGE:
            dispatch(fetchChat(action.result.user._id, true));
            break;
    }
};
