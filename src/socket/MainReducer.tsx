import { UserMessage } from 'components/UserMessage/UserMessage';
import React from 'react';
import { NewMessageActionPayload } from 'types/SocketAction';
import { SocketReducer } from 'types/SocketReducer';
import { checkPathname, PATHS } from 'utils/route-helpers';

export const mainReducer: SocketReducer<NewMessageActionPayload> = ({
  action,
  notification,
}) => {
  if (action.status === 404) {
    window.location.href = PATHS.NOT_FOUND;
  }

  switch (action.type) {
    case 'NEW_MESSAGE':
      if (!checkPathname(window.location.pathname, PATHS.CHAT)) {
        notification.open({
          message: (
            <UserMessage
              message={action.result.message}
              user={action.result.user}
            />
          ),
          placement: 'bottomRight',
        });
      }

      break;
  }
};
