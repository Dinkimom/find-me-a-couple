import { fetchChat } from 'features/chat/chatsSlice';
import { SocketReducer } from 'types/SocketReducer';

export const chatReducer: SocketReducer<{ receiver: string }> = (
  action,
  dispatch
) => {
  switch (action.type) {
    case 'CHAT':
      dispatch(fetchChat(action.result.receiver, true));
      break;
  }
};
