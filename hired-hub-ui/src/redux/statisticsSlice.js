import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';

const apiUrl = 'http://localhost:8888/api/v1';

export const fetchStatisticsDashboard = createAsyncThunk(
    'statistics/fetchStatisticsDashboard', 
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            throw new Error('Token không tồn tại');
        }
        try {
            const response = await axios.get(`${apiUrl}/employer/applications/statistics`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
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