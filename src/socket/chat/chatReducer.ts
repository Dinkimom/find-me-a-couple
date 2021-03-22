import { updateChatHistory, updateUsersState, updateUserTypingState } from 'features/chat/chatsSlice';
import {
    ChatActionPayload,
    NewMessageActionPayload,
    UpdateUsersPayload,
    UpdateUsersTypingStatePayload,
} from 'types/socket-actions';
import { SocketReducer } from 'types/SocketReducer';
import { ChatActionType } from './ChatActionType';

export const chatReducer: SocketReducer<
    ChatActionPayload & NewMessageActionPayload & UpdateUsersPayload & UpdateUsersTypingStatePayload
> = ({ action, dispatch }) => {
    switch (action.type) {
        case ChatActionType.UPDATE_CHAT:
            dispatch(updateChatHistory(action.payload.lastMessage));
            break;

        case ChatActionType.GET_USERS:
        case ChatActionType.UPDATE_USERS:
            dispatch(updateUsersState(action.payload.usersState));
            break;

        case ChatActionType.TYPING_STATUS:
            dispatch(updateUserTypingState(action.payload.usersTypingState));
            break;
    }
};
