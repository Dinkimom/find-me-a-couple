import { updateChatHistory, updateUsers, updateUser } from 'features/chat/chatsSlice';
import {
    ChatActionPayload,
    NewMessageActionPayload,
    UpdateUserPayload,
    UpdateUsersPayload,
} from 'types/socket-actions';
import { SocketReducer } from 'types/SocketReducer';
import { ChatActionType } from './ChatActionType';

export const chatReducer: SocketReducer<ChatActionPayload & NewMessageActionPayload & UpdateUsersPayload> = ({
    action,
    dispatch,
}) => {
    console.log(action);

    switch (action.type) {
        case ChatActionType.UPDATE_CHAT:
        case ChatActionType.MESSAGE_RECEIVED:
            dispatch(updateChatHistory(action.payload.lastMessage));
            break;

        case ChatActionType.GET_USERS:
        case ChatActionType.UPDATE_USERS:
            dispatch(updateUsers(action.payload.usersState));
            break;
    }
};
