import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { chatsControl } from 'App';
import { AppThunk } from 'app/store';
import { ChatDto } from 'dtos/ChatDto';
import { ErrorDto } from 'dtos/ErrorDto';
import { MessageDto } from 'dtos/MessageDto';
import { NewMessageDto } from 'dtos/NewMessageDto';
import { UsersStateDto } from 'dtos/UsersStateDto';
import { chatActions } from 'socket/chat/chatActions';
import { w3cwebsocket } from 'websocket';

interface ChatsState {
    list: ChatDto[];
    // list of users, that we chatted before
    users: UsersStateDto;
    isFetching: boolean;
    loaded: boolean;
    error: null | ErrorDto;
    chat: {
        typing: boolean;
        chatData: null | ChatDto;
        isFetching: boolean;
        submitting: boolean;
        error: null | ErrorDto;
    };
}

const initialState: ChatsState = {
    list: [],
    users: {},
    isFetching: false,
    loaded: false,
    error: null,
    chat: {
        typing: false,
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
            state.loaded = false;
            state.error = null;
        },
        fetchChatsSuccess: (state, action: PayloadAction<ChatDto[]>) => {
            state.list = action.payload;
            state.loaded = true;
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
                typing: false,
                chatData: null,
                isFetching: true,
                submitting: false,
                error: null,
            };
        },
        fetchChatSuccess: (state, action: PayloadAction<ChatDto>) => {
            state.chat = {
                typing: false,
                chatData: action.payload,
                isFetching: false,
                submitting: false,
                error: null,
            };
        },
        updateChatHistory: (state, action: PayloadAction<MessageDto>) => {
            if (state.chat.chatData) {
                state.chat = {
                    typing: false,
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
                typing: false,
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
        updateUsers: (state, action: PayloadAction<UsersStateDto>) => {
            state.users = action.payload;
        },
        updateUser: (state, action: PayloadAction<UsersStateDto>) => {
            state.users = { ...state.users, ...action.payload };
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
    updateUsers,
    updateUser,
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
    } catch (error) {
        console.log(error);

        notification.error({ message: 'Could not send message, try again...' });

        dispatch(sendMessageEnd());
    }
};

export const chatsReducer = chatsSlice.reducer;
