import { SocketReducer } from 'types/SocketReducer';
import { chatReducer } from './chat/chatReducer';
import { chatsReducer } from './chats/chatsReducer';
import { mainReducer } from './main/mainReducer';

export const socketReducers: SocketReducer[] = [mainReducer, chatReducer, chatsReducer];
