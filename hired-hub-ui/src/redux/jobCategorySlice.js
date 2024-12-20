import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
import axios from 'axios';
import axiosPro, { baseURL } from '../config/axios';

const apiUrl = `${baseURL}job-category`;

export const fetchJobCategories = createAsyncThunk('jobCategories/fetchjobCategories', async () => {
    const response = await axios.get(apiUrl);
    return response.data.data;
});

export const createJobCategory = createAsyncThunk(
    'jobCategories/createJobCategory',
    async (jobCategory, { rejectWithValue }) => {
        try {
            const response = await axiosPro.post(apiUrl, jobCategory);
            notification.success({
                message: 'Thành công',
                description: 'Thêm công việc mới thành công',
            });
            return response.data.data;
        } catch (error) {
            notification.success({
                message: 'Thất bại',
                description: `Thêm công việc mới thất bại - ${
                    error.response.data.message || error.response.data || 'lỗi bất định'
                }`,
            });
            return rejectWithValue(error.response.data);
        }
    },
);

const jobCategorySlice = createSlice({
    name: 'jobCategories',
    initialState: {
        list: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchJobCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(createJobCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createJobCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createJobCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default jobCategorySlice.reducer;
