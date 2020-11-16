import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { accountControl } from '../../App';
import { AppThunk, RootState } from '../../app/store';
import { ErrorDto } from '../../dtos/ErrorDto';
import { LoginDto } from '../../dtos/LoginDto';
import { RegisterDto } from '../../dtos/RegisterDto';
import { UserDto } from '../../dtos/UserDto';

interface AccountState {
  user: UserDto | null;
  isFetching: boolean;
  isLogged: boolean;

  loginForm: {
    error: null | ErrorDto;
    isFetching: boolean;
  };
  registerForm: {
    error: null | ErrorDto;
    isFetching: boolean;
  };
}

const initialState: AccountState = {
  user: null,
  isFetching: false,
  isLogged: false,
  loginForm: {
    error: null,
    isFetching: false,
  },
  registerForm: {
    error: null,
    isFetching: false,
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.isFetching = true;
      state.isLogged = false;
      state.loginForm.error = null;
      state.loginForm.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isLogged = true;
      state.loginForm.error = null;
      state.loginForm.isFetching = false;
    },
    loginFailed: (state, actionPayload: PayloadAction<ErrorDto>) => {
      state.user = null;
      state.isFetching = false;
      state.isLogged = false;
      state.loginForm.error = actionPayload.payload;
      state.loginForm.isFetching = false;
    },
    registerStart: (state) => {
      state.user = null;
      state.isFetching = true;
      state.isLogged = false;
      state.registerForm.error = null;
      state.registerForm.isFetching = true;
    },
    registerSuccess: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isLogged = true;
      state.registerForm.error = null;
      state.registerForm.isFetching = false;
    },
    registerFailed: (state, actionPayload: PayloadAction<ErrorDto>) => {
      state.user = null;
      state.isFetching = false;
      state.isLogged = false;
      state.registerForm.error = actionPayload.payload;
      state.registerForm.isFetching = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
} = accountSlice.actions;

export const login = (data: LoginDto): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await accountControl.login(data);

    dispatch(loginSuccess(response.data.result));
  } catch (error) {
    dispatch(loginFailed(error));
  }
};

export const register = (data: RegisterDto): AppThunk => async (dispatch) => {
  try {
    dispatch(registerStart());

    const response = await accountControl.register(data);

    dispatch(registerSuccess(response.data.result.user));
  } catch (error) {
    dispatch(registerFailed(error));
  }
};

export const accountReducer = accountSlice.reducer;
