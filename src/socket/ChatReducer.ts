import { fetchChat } from 'features/chat/chatsSlice';
import { ChatActionPayload, NewMessageActionPayload } from 'types/SocketAction';
import { SocketReducer } from 'types/SocketReducer';

export const chatReducer: SocketReducer<
  ChatActionPayload & NewMessageActionPayload
> = ({ action, dispatch }) => {
  switch (action.type) {
    case 'CHAT':
      dispatch(fetchChat(action.result.receiver, true));
      break;
    case 'NEW_MESSAGE':
      dispatch(fetchChat(action.result.user._id, true));
      break;
  }
};
