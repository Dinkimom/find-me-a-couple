import { fetchChats } from 'features/chat/chatsSlice';
import { SocketReducer } from 'types/SocketReducer';

export const chatsReducer: SocketReducer<void> = (action, dispatch) => {
  switch (action.type) {
    case 'CHAT':
      dispatch(fetchChats(true));
      break;
  }
};
