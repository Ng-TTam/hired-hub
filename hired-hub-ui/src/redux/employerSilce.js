import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosPro, { baseURL } from '../config/axios';
import { notification } from 'antd';

const apiURL = `${baseURL}account/employer/sign-up`;
const updateCompanyURL = `${baseURL}user/update-company-info`;

export const registerEmployer = createAsyncThunk('employer/register', async (employerData, { rejectWithValue }) => {
    try {
        const response = await axios.post(apiURL, employerData);
        return response.data;
    } catch (error) {
        // Trả về lỗi nếu có
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const updateEmployerCompany = createAsyncThunk(
    'employer/updateCompanyInfo',
    async ({ companyId }, { rejectWithValue }) => {
        try {
            const response = await axiosPro.post(updateCompanyURL, { companyId });
            notification.success({
                message: 'Thành công',
                description: 'Cập nhật thông tin công ty thành công',
            });
            return response.data;
        } catch (error) {
            notification.error({
                message: 'Thất bại',
                description: `Cập nhật thông tin công ty thất bại - ${
                    error.response.data.message || error.response.data || 'lỗi bất định'
                }`,
            });
            return rejectWithValue(error.response.data);
        }
    },
);

const employerSlice = createSlice({
    name: 'employer',
    initialState: {
        loading: false,
        employerInfo: null,
        error: null,
        success: false,
    },
    reducers: {
        clearRegisterState: (state) => {
            state.loading = false;
            state.employerInfo = null;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerEmployer.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerEmployer.fulfilled, (state, action) => {
                state.loading = false;
                state.employerInfo = action.payload;
                state.success = true;
            })
            .addCase(registerEmployer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { clearRegisterState } = employerSlice.actions;
export default employerSlice.reducer;
