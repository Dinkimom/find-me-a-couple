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
  isChecked: boolean;
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
  isChecked: false,
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
      state.isChecked = false;
      state.loginForm.error = null;
      state.loginForm.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isLogged = true;
      state.isChecked = true;
      state.loginForm.error = null;
      state.loginForm.isFetching = false;
    },
    loginFailure: (state, actionPayload: PayloadAction<ErrorDto>) => {
      state.user = null;
      state.isFetching = false;
      state.isLogged = false;
      state.isChecked = true;
      state.loginForm.error = actionPayload.payload;
      state.loginForm.isFetching = false;
    },
    registerStart: (state) => {
      state.user = null;
      state.isFetching = true;
      state.isLogged = false;
      state.isChecked = false;
      state.registerForm.error = null;
      state.registerForm.isFetching = true;
    },
    registerSuccess: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isLogged = true;
      state.isChecked = true;
      state.registerForm.error = null;
      state.registerForm.isFetching = false;
    },
    registerFailure: (state, actionPayload: PayloadAction<ErrorDto>) => {
      state.user = null;
      state.isFetching = false;
      state.isLogged = false;
      state.isChecked = true;
      state.registerForm.error = actionPayload.payload;
      state.registerForm.isFetching = false;
    },
    checkStart: (state) => {
      state.user = null;
      state.isFetching = true;
      state.isLogged = false;
      state.isChecked = false;
    },
    checkSuccess: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isLogged = true;
      state.isChecked = true;
    },
    checkFailure: (state) => {
      state.user = null;
      state.isFetching = false;
      state.isLogged = false;
      state.isChecked = true;
    },
    logout: (state) => {
      state = { ...initialState };
      localStorage.clear();
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  checkStart,
  checkSuccess,
  checkFailure,
} = accountSlice.actions;

export const login = (data: LoginDto): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await accountControl.login(data);

    dispatch(loginSuccess(response.data.result));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const register = (data: RegisterDto): AppThunk => async (dispatch) => {
  try {
    dispatch(registerStart());

    const response = await accountControl.register(data);

    dispatch(registerSuccess(response.data.result.user));
  } catch (error) {
    dispatch(registerFailure(error));
  }
};

export const check = (): AppThunk => async (dispatch) => {
  try {
    dispatch(checkStart());

    const response = await accountControl.check();

    dispatch(checkSuccess(response.data.result));
  } catch {
    dispatch(checkFailure());
  }
};

export const accountReducer = accountSlice.reducer;
