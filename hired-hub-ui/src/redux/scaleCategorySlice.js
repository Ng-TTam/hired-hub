import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../config/axios';

const apiURL = `${baseURL}scale-category`;

export const fetchScaleCategories = createAsyncThunk(
    'scaleCategories/fetchScaleCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiURL);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.message || error.response.data);
        }
    },
);

const scaleCategorySlice = createSlice({
    name: 'scaleCategories',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchScaleCategories.pending, (state) => {
                state.loading = true;
                state.list = [];
                state.error = null;
            })
            .addCase(fetchScaleCategories.fulfilled, (state, action) => {
                state.list = action.payload.data;
                state.loading = false;
            })
            .addCase(fetchScaleCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default scaleCategorySlice.reducer;
