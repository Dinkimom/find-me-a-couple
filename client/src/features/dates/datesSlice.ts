import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { datesControl } from '../../App';
import { AppThunk } from '../../app/store';
import { DateDto } from '../../dtos/DateDto';
import { ErrorDto } from '../../dtos/ErrorDto';
import { ModalFormState } from '../../types/ModalFormState';

interface DatesState {
  list: DateDto[];
  isFetching: boolean;
  error: ErrorDto | null;
  createForm: ModalFormState & {
    current: Partial<DateDto> | null;
  };
  updateForm: ModalFormState & {
    current: DateDto | null;
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
    current: null,
  },
  updateForm: {
    opened: false,
    isFetching: false,
    error: null,
    current: null,
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
    toggleCreateForm: (state, action?: PayloadAction<Partial<DateDto>>) => {
      state.createForm.current = action?.payload || null;
      state.createForm.opened = !state.createForm.opened;
      state.createForm.error = null;
      state.createForm.isFetching = false;
    },
    createStart: (state) => {
      state.createForm.error = null;
      state.createForm.isFetching = true;
    },
    createSuccess: (state) => {
      state.createForm.current = null;
      state.createForm.opened = false;
      state.createForm.isFetching = false;
      state.createForm.error = null;
    },
    createFailure: (state, action: PayloadAction<ErrorDto>) => {
      state.createForm.isFetching = false;
      state.createForm.error = action.payload;
    },
    toggleUpdateForm: (state, action?: PayloadAction<DateDto>) => {
      state.updateForm.current = action?.payload || null;
      state.updateForm.opened = !state.updateForm.opened;
      state.updateForm.isFetching = false;
      state.updateForm.error = null;
    },
    updateStart: (state) => {
      state.updateForm.isFetching = true;
      state.updateForm.error = null;
    },
    updateSuccess: (state) => {
      state.updateForm.current = null;
      state.updateForm.opened = false;
      state.updateForm.isFetching = false;
      state.updateForm.error = null;
    },
    updateFailure: (state, action: PayloadAction<ErrorDto>) => {
      state.updateForm.isFetching = false;
      state.updateForm.error = action.payload;
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
  toggleUpdateForm,
  updateStart,
  updateSuccess,
  updateFailure,
} = datesSlice.actions;

export const fetch = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchStart);

    const response = await datesControl.getDates();

    dispatch(response.data.result.list);
  } catch (error) {
    dispatch(fetchFailure(error));
  }
};

export const create = (data: DateDto): AppThunk => async (dispatch) => {
  try {
    dispatch(createStart());

    await datesControl.create(data);

    dispatch(createSuccess());

    dispatch(fetch());
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
