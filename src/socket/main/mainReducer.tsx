import notification from 'antd/lib/notification';
import { UserMessage } from 'components/UserMessage/UserMessage';
import { updateUsers } from 'features/chat/chatsSlice';
import React from 'react';
import { ChatActionType } from 'socket/chat/ChatActionType';
import { NewMessageActionPayload, UpdateUsersPayload } from 'types/socket-actions';
import { SocketReducer } from 'types/SocketReducer';
import { checkPathname, PATHS } from 'utils/route-helpers';

export const mainReducer: SocketReducer<NewMessageActionPayload & UpdateUsersPayload> = ({
    action,
    history,
    dispatch,
}) => {
    if (action.status === 404) {
        window.location.href = PATHS.NOT_FOUND;
    }

    switch (action.type) {
        case ChatActionType.MESSAGE_RECEIVED:
            if (!checkPathname(window.location.pathname, PATHS.CHAT)) {
                const { lastMessage, user } = action.payload;

                const handleMessageClick = () => {
                    history.push(`${PATHS.CHATS}/${user._id}`);
                    notification.destroy();
                };

                notification.open({
                    message: <UserMessage message={lastMessage} user={user} />,
                    placement: 'bottomRight',
                    onClick: handleMessageClick,
                });
            }
            break;

        case ChatActionType.UPDATE_USERS:
            dispatch(updateUsers(action.payload.usersState));
            break;
    }
};
