import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosPro, { baseURL } from '../config/axios';
import { notification } from 'antd';

const apiUrl = `${baseURL}position-category`;

export const fetchPostions = createAsyncThunk('postionCategories/fetchPostions', async () => {
    const response = await axios.get(apiUrl);
    return response.data.data;
});

export const createPosition = createAsyncThunk(
    'positionCategories/createPosition',
    async (positionCategory, { rejectWithValue }) => {
        try {
            const response = await axiosPro.post(apiUrl, positionCategory);
            notification.success({
                message: 'Thành công',
                description: 'Thêm vị trí mới thành công',
            });
            return response.data.data;
        } catch (error) {
            notification.success({
                message: 'Thất bại',
                description: `Thêm vị trí mới thất bại - ${
                    error.response.data.message || error.response.data || 'lỗi bất định'
                }`,
            });
            return rejectWithValue(error.response.data);
        }
    },
);

const postionCategorySlice = createSlice({
    name: 'postionCategories',
    initialState: {
        list: [],
        loading: false,
        error: null,
        success: false,
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
            })

            .addCase(createPosition.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createPosition.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createPosition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default postionCategorySlice.reducer;
