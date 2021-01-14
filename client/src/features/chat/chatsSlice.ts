import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chatsControl } from '../../App';
import { AppThunk } from '../../app/store';
import { ChatDto } from '../../dtos/ChatDto';

interface ChatsState {
  list: ChatDto[];
  isFetching: boolean;
  error: null | string;
  chat: {
    chatData: null | ChatDto;
    isFetching: boolean;
    error: null | string;
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
    fetchChatsFailure: (state, action: PayloadAction<string>) => {
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
    fetchChatFailure: (state, action: PayloadAction<string>) => {
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

export const fetchChats = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchChatsStart());

    const response = await chatsControl.getChats();

    dispatch(fetchChatsSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchChatsFailure(error));
  }
};

export const fetchChat = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchChatStart());

    const response = await chatsControl.getChat(id);

    dispatch(fetchChatSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchChatFailure(error));
  }
};

export const chatsReducer = chatsSlice.reducer;
