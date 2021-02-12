import { fetchChats } from 'features/chat/chatsSlice';
import { SocketReducer } from 'types/SocketReducer';
import { SocketActionType } from './types/SocketActionType';

export const chatsReducer: SocketReducer<void> = ({ action, dispatch }) => {
  switch (action.type) {
    case SocketActionType.CHAT:
      dispatch(fetchChats(true));
      break;
  }
};
