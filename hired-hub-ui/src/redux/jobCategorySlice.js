import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../config/axios';

const apiUrl = `${baseURL}job-category`;

export const fetchJobCategories = createAsyncThunk('jobCategories/fetchjobCategories', async () => {
    const response = await axios.get(apiUrl);
    return response.data.data;
});

const jobCategorySlice = createSlice({
    name: 'jobCategories',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchJobCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default jobCategorySlice.reducer;
