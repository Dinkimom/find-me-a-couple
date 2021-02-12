import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { accountReducer } from 'features/account/accountSlice';
import { chatsReducer } from 'features/chat/chatsSlice';
import { datesReducer } from 'features/dates/datesSlice';
import { usersReducer } from 'features/users/usersSlice';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        users: usersReducer,
        dates: datesReducer,
        chats: chatsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
