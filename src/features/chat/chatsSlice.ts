import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { chatsControl } from 'App';
import { AppThunk } from 'app/store';
import { ChatDto } from 'dtos/ChatDto';
import { ErrorDto } from 'dtos/ErrorDto';
import { MessageDto } from 'dtos/MessageDto';
import { NewMessageDto } from 'dtos/NewMessageDto';
import { chatActions } from 'socket/chat/chatActionts';
import { w3cwebsocket } from 'websocket';

interface ChatsState {
    list: ChatDto[];
    isFetching: boolean;
    error: null | ErrorDto;
    chat: {
        chatData: null | ChatDto;
        isFetching: boolean;
        submitting: boolean;
        error: null | ErrorDto;
    };
}

const initialState: ChatsState = {
    list: [],
    isFetching: false,
    error: null,
    chat: {
        chatData: null,
        isFetching: false,
        submitting: false,
        error: null,
    },
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        fetchChatsStart: (state) => {
            state.list = [];
            state.isFetching = true;
            state.error = null;
            state.chat = {
                chatData: null,
                isFetching: false,
                submitting: false,
                error: null,
            };
        },
        fetchChatsSuccess: (state, action: PayloadAction<ChatDto[]>) => {
            state.list = action.payload;
            state.isFetching = false;
            state.error = null;
        },
        fetchChatsFailure: (state, action: PayloadAction<ErrorDto>) => {
            state.list = [];
            state.isFetching = false;
            state.error = action.payload;
        },
        fetchChatStart: (state) => {
            state.chat = {
                chatData: null,
                isFetching: true,
                submitting: false,
                error: null,
            };
        },
        fetchChatSuccess: (state, action: PayloadAction<ChatDto>) => {
            state.chat = {
                chatData: action.payload,
                isFetching: false,
                submitting: false,
                error: null,
            };
        },
        updateChatHistory: (state, action: PayloadAction<MessageDto>) => {
            if (state.chat.chatData) {
                state.chat = {
                    chatData: {
                        companion: (state.chat.chatData as ChatDto).companion,
                        lastMessage: action.payload,
                        messages: [...(state.chat.chatData as ChatDto).messages, action.payload],
                    },
                    isFetching: false,
                    submitting: false,
                    error: null,
                };
            } else {
                const newList = [...state.list];

                const newItem = newList.find((item) => item.companion._id === action.payload.user_id);

                if (newItem) {
                    newItem.lastMessage = action.payload;

                    state.list = newList;
                }
            }
        },
        fetchChatFailure: (state, action: PayloadAction<ErrorDto>) => {
            state.chat = {
                chatData: null,
                isFetching: false,
                submitting: false,
                error: action.payload,
            };
        },
        sendMessageStart: (state) => {
            state.chat = {
                ...state.chat,
                submitting: true,
            };
        },
        sendMessageEnd: (state) => {
            state.chat = {
                ...state.chat,
                submitting: false,
            };
        },
    },
});

export const {
    fetchChatsStart,
    fetchChatsSuccess,
    fetchChatsFailure,
    fetchChatStart,
    fetchChatSuccess,
    fetchChatFailure,
    sendMessageStart,
    sendMessageEnd,
    updateChatHistory,
} = chatsSlice.actions;

export const fetchChats = (silent = false): AppThunk => async (dispatch) => {
    try {
        !silent && dispatch(fetchChatsStart());

        const response = await chatsControl.getChats();

        dispatch(fetchChatsSuccess(response.data.result));
    } catch (error) {
        dispatch(fetchChatsFailure(error));
    }
};

export const fetchChat = (id: string, silent = false): AppThunk => async (dispatch) => {
    try {
        !silent && dispatch(fetchChatStart());

        const response = await chatsControl.getChat(id);

        dispatch(fetchChatSuccess(response.data.result));
    } catch (error) {
        dispatch(fetchChatFailure(error));
    }
};

export const sendMessage = (
    user_id: string,
    receiver: string,
    message: NewMessageDto,
    socket: w3cwebsocket,
): AppThunk => async (dispatch) => {
    try {
        dispatch(sendMessageStart());

        socket.send(chatActions.sendMessage(user_id, receiver, message));
    } catch {
        notification.error({ message: 'Could not send message, try again...' });

        dispatch(sendMessageEnd());
    }
};

export const chatsReducer = chatsSlice.reducer;
