import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8888/api/v1/cv';

// Tạo một thunk để lấy danh sách CV từ API
export const fetchCVs = createAsyncThunk('cv/fetchCVs', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm Bearer token vào header
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

// Tạo slice cho cv
const cvSlice = createSlice({
    name: 'cv',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCVs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCVs.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCVs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.data?.message || 'Lỗi không xác định';
            });
    },
});

export default cvSlice.reducer;
