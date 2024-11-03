import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';

const apiUrl = 'position-category';

export const fetchPostions = createAsyncThunk('postionCategories/fetchPostions', async () => {
    const response = await axios.get(apiUrl);
    return response.data.data;
});

const postionCategorySlice = createSlice({
    name: 'postionCategories',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPostions.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchPostions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default postionCategorySlice.reducer;
