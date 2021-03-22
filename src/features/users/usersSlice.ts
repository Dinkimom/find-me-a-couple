import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usersControl } from 'services';
import { AppThunk } from 'app/store';
import { ErrorDto } from 'dtos/ErrorDto';
import { UserDto } from 'dtos/UserDto';
import { Filter } from 'types/Filter';

interface UsersState {
    list: UserDto[];
    isFetching: boolean;
    error: null | ErrorDto;
}

const initialState: UsersState = {
    list: [],
    isFetching: false,
    error: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.list = [];
            state.isFetching = true;
            state.error = null;
        },
        fetchSuccess: (state, action: PayloadAction<UserDto[]>) => {
            state.list = action.payload;
            state.isFetching = false;
            state.error = null;
        },
        fetchFailure: (state, action: PayloadAction<ErrorDto>) => {
            state.list = [];
            state.isFetching = true;
            state.error = action.payload;
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure } = usersSlice.actions;

export const fetch = (filter?: Filter): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchStart());

        const response = await usersControl.getUsers(filter);

        dispatch(fetchSuccess(response.data.result));
    } catch (error) {
        dispatch(fetchFailure(error));
    }
};

export const usersReducer = usersSlice.reducer;
