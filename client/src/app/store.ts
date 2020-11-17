import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { accountReducer } from '../features/account/accountSlice';
import { usersReducer } from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
