import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    criteria: {},
    pageable: {
        page: 0,
        size: 12,
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateCriteria: (state, action) => {
            state.criteria = { ...state.criteria, ...action.payload };
            state.pageable = { ...state.pageable, page: 0 };
        },
        setCriteria: (state, action) => {
            state.criteria = action.payload;
            state.pageable = { ...state.pageable, page: 0 };
        },
        updatePageable: (state, action) => {
            state.pageable = { ...state.pageable, ...action.payload };
        },
        setPageable: (state, action) => {
            state.pageable = action.payload;
        },
    },
});

export const { updateCriteria, setCriteria, updatePageable, setPageable } = filterSlice.actions;

export default filterSlice.reducer;
