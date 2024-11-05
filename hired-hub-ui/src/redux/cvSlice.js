import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8888/api/v1/cv';

// Tạo một thunk để lấy danh sách CV từ API
export const fetchCVs = createAsyncThunk('cv/fetchCVs', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (!token) {
            throw new Error('Token không tồn tại'); // Kiểm tra nếu token không tồn tại
        }
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm Bearer token vào header
            },
        });
        return response.data.data; // Trả về dữ liệu khi thành công
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Lỗi không xác định'); // Trả về lỗi nếu có
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
                state.loading = true; // Đặt trạng thái loading
                state.error = null; // Đặt lỗi về null khi bắt đầu
            })
            .addCase(fetchCVs.fulfilled, (state, action) => {
                state.loading = false; // Đặt trạng thái loading thành false khi thành công
                state.list = action.payload; // Cập nhật danh sách CV
            })
            .addCase(fetchCVs.rejected, (state, action) => {
                state.loading = false; // Đặt trạng thái loading thành false khi lỗi
                state.error = action.payload || 'Lỗi không xác định'; // Cập nhật thông báo lỗi
            });
    },
});

export default cvSlice.reducer;
