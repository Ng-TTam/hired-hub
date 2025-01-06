import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosPro, { baseURL } from '../config/axios';

const apiUrl = 'http://localhost:8888/api/v1';

export const fetchStatisticsDashboard = createAsyncThunk(
    'statistics/fetchStatisticsDashboard', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiUrl}/employer/applications/statistics`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.message || error.response.data);
        }
    }
);

const statisticsSlice = createSlice({
    name: 'statisticsSlice',
    initialState: {
        statistics: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatisticsDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStatisticsDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.statistics = action.payload.data;
            })
            .addCase(fetchStatisticsDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default statisticsSlice.reducer;