import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';
import { AppThunk } from '../../app/store';
import { ErrorDto } from '../../dtos/ErrorDto';
import { LoginDto } from '../../dtos/LoginDto';
import { RegisterDto } from '../../dtos/RegisterDto';
import { UserDto } from '../../dtos/UserDto';
import { accountControl } from '../../services';
import { FormState } from '../../types/FormState';
import { ModalFormState } from '../../types/ModalFormState';

interface AccountState {
  user: UserDto | null;
  isFetching: boolean;
  isLogged: boolean;
  isChecked: boolean;
  loginForm: FormState;
  registerForm: FormState;
  updateForm: ModalFormState;
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
  updateForm: {
    error: null,
    isFetching: false,
    opened: false,
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
    startLogout: (state) => {
      state.user = null;
      state.isFetching = false;
      state.isLogged = false;
      state.isChecked = true;
      state.registerForm.error = null;
      state.registerForm.isFetching = false;
      state.loginForm.error = null;
      state.loginForm.isFetching = false;
    },
    toggleUpdateForm: (state) => {
      state.updateForm.opened = !state.updateForm.opened;
    },
    updateStart: (state) => {
      state.isFetching = true;
      state.isLogged = true;
      state.isChecked = true;
      state.updateForm.error = null;
      state.updateForm.isFetching = true;
    },
    updateSuccess: (state, action: PayloadAction<UserDto>) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isLogged = true;
      state.isChecked = true;
      state.updateForm.error = null;
      state.updateForm.isFetching = false;
      state.updateForm.opened = false;
    },
    updateFailure: (state, actionPayload: PayloadAction<ErrorDto>) => {
      state.isFetching = false;
      state.isChecked = true;
      state.isLogged = true;
      state.updateForm.error = actionPayload.payload;
      state.updateForm.isFetching = false;
    },
    removeStart: (state) => {
      state.isFetching = true;
    },
    removeSuccess: (state) => {
      state.user = null;
      state.isFetching = false;
      state.isLogged = false;
      state.isChecked = true;
    },
    removeFailure: (state) => {
      state.isFetching = false;
      state.isLogged = true;
      state.isChecked = true;
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
  startLogout,
  toggleUpdateForm,
  updateStart,
  updateSuccess,
  updateFailure,
  removeStart,
  removeSuccess,
  removeFailure,
} = accountSlice.actions;

export const login = (data: LoginDto): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await accountControl.login(data);

    dispatch(loginSuccess(response.data.result.user));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const register = (data: RegisterDto): AppThunk => async (dispatch) => {
  try {
    console.log(data);
    dispatch(registerStart());

    const response = await accountControl.register(data);

    dispatch(registerSuccess(response.data.result.user));
  } catch (error) {
    dispatch(registerFailure(error));
  }
};

export const update = (id: string, data: RegisterDto): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(updateStart());

    const response = await accountControl.update(id, data);

    dispatch(updateSuccess(response.data.result.user));
  } catch (error) {
    dispatch(updateFailure(error));
  }
};

export const remove = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(removeStart());

    await accountControl.remove(id);

    dispatch(removeSuccess());
  } catch (error) {
    dispatch(removeFailure());
  }
};

export const check = (): AppThunk => async (dispatch) => {
  try {
    dispatch(checkStart());

    const response = await accountControl.check();

    dispatch(checkSuccess(response.data.result.user));
  } catch {
    dispatch(checkFailure());
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(startLogout());

  await AsyncStorage.clear();
};

export const accountReducer = accountSlice.reducer;
