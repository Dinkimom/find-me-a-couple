import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { chatsControl } from '../../App';
import { AppThunk } from '../../app/store';
import { ChatDto } from '../../dtos/ChatDto';
import { ErrorDto } from '../../dtos/ErrorDto';
import { MessageDto } from '../../dtos/MessageDto';

interface ChatsState {
  list: ChatDto[];
  isFetching: boolean;
  error: null | ErrorDto;
  chat: {
    chatData: null | ChatDto;
    isFetching: boolean;
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
        error: null,
      };
    },
    fetchChatSuccess: (state, action: PayloadAction<ChatDto>) => {
      state.chat = {
        chatData: action.payload,
        isFetching: false,
        error: null,
      };
    },
    fetchChatFailure: (state, action: PayloadAction<ErrorDto>) => {
      state.chat = {
        chatData: null,
        isFetching: false,
        error: action.payload,
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
} = chatsSlice.actions;

export const fetchChats = (silent: boolean = false): AppThunk => async (
  dispatch
) => {
  try {
    !silent && dispatch(fetchChatsStart());

    const response = await chatsControl.getChats();

    dispatch(fetchChatsSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchChatsFailure(error));
  }
};

export const fetchChat = (
  id: string,
  silent: boolean = false
): AppThunk => async (dispatch) => {
  try {
    !silent && dispatch(fetchChatStart());

    const response = await chatsControl.getChat(id);

    dispatch(fetchChatSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchChatFailure(error));
  }
};

export const sendMessage = (
  receiver: string,
  data: MessageDto
): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchChatStart());

    const response = await chatsControl.sendMessage(receiver, data);

    dispatch(fetchChatSuccess(response.data.result));
  } catch {
    notification.error({ message: 'Could not send message, try again...' });
  }
};

export const chatsReducer = chatsSlice.reducer;
