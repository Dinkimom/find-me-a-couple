import { SocketReducer } from 'types/SocketReducer';
import { chatReducer } from './ChatReducer';
import { chatsReducer } from './ChatsReducer';
import { mainReducer } from './MainReducer';

export const socketReducers: SocketReducer[] = [mainReducer, chatReducer, chatsReducer];
