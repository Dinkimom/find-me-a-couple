import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { DateDto } from '../../dtos/DateDto';
import { ErrorDto } from '../../dtos/ErrorDto';
import { NewDateDto } from '../../dtos/NewDateDto';
import { UserDto } from '../../dtos/UserDto';
import { datesControl } from '../../services';
import { ModalFormState } from '../../types/ModalFormState';
import { fetch as fetchUsers } from '../users/usersSlice';

interface DatesState {
  list: DateDto[];
  isFetching: boolean;
  error: ErrorDto | null;
  createForm: ModalFormState & {
    receiver: UserDto | null;
  };
}

const initialState: DatesState = {
  list: [],
  isFetching: false,
  error: null,
  createForm: {
    opened: false,
    isFetching: false,
    error: null,
    receiver: null,
  },
};

const datesSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.list = [];
      state.isFetching = true;
      state.error = null;
    },
    fetchSuccess: (state, action: PayloadAction<DateDto[]>) => {
      state.list = action.payload;
      state.isFetching = false;
      state.error = null;
    },
    fetchFailure: (state, action: PayloadAction<ErrorDto>) => {
      state.list = [];
      state.isFetching = false;
      state.error = action.payload;
    },
    toggleCreateForm: (state, action: PayloadAction<UserDto | null>) => {
      state.createForm.receiver = action.payload;
      state.createForm.opened = !state.createForm.opened;
      state.createForm.error = null;
      state.createForm.isFetching = false;
    },
    createStart: (state) => {
      state.createForm.error = null;
      state.createForm.isFetching = true;
    },
    createSuccess: (state) => {
      state.createForm.receiver = null;
      state.createForm.opened = false;
      state.createForm.isFetching = false;
      state.createForm.error = null;
    },
    createFailure: (state, action: PayloadAction<ErrorDto>) => {
      state.createForm.isFetching = false;
      state.createForm.error = action.payload;
    },
    updateStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    updateSuccess: (state) => {
      state.isFetching = false;
      state.error = null;
    },
    updateFailure: (state, action: PayloadAction<ErrorDto>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  toggleCreateForm,
  createStart,
  createSuccess,
  createFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} = datesSlice.actions;

export const fetch = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchStart());

    const response = await datesControl.getDates();

    dispatch(fetchSuccess(response.data.result));
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};

export const create = (data: NewDateDto): AppThunk => async (dispatch) => {
  try {
    dispatch(createStart());

    await datesControl.create(data);

    dispatch(createSuccess());

    dispatch(fetchUsers());
  } catch (error) {
    dispatch(createFailure(error));
  }
};

export const update = (id: string, data: Partial<DateDto>): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(updateStart());

    await datesControl.update(id, data);

    dispatch(fetch());
  } catch (error) {
    dispatch(updateFailure(error));
  }
};

export const datesReducer = datesSlice.reducer;
