import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';

const apiUrl = 'http://localhost:8888/api/v1/user';

// Thunk để lấy thông tin người dùng
export const fetchUserInformation = createAsyncThunk(
    'user/fetchUserInformation', 
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (!token) {
            throw new Error('Token không tồn tại');
        }
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm Bearer token vào header
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null, // Lấy dữ liệu từ localStorage nếu có
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInformation.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchUserInformation.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem('user', JSON.stringify(action.payload.data)); // Lưu vào localStorage
                state.user = action.payload.data;
            })
            .addCase(fetchUserInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default userSlice.reducer;
