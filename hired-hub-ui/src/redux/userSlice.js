import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';
import { baseURL } from '../config/axios';

const apiUrl = `${baseURL}user`;

export const fetchUserInformation = createAsyncThunk('user/fetchUserInformation', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (!token) {
        throw new Error('Token không tồn tại'); // Kiểm tra nếu token không tồn tại
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
});

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
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
                state.user = action.payload.data;
            })
            .addCase(fetchUserInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default userSlice.reducer;
