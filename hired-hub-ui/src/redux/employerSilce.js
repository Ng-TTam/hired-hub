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
                localStorage.setItem('token', action.payload.data.token);
                localStorage.setItem('refresh-token', action.payload.data.refreshToken);
                localStorage.setItem('email', action.meta.arg.email);
                localStorage.setItem('isLogin', true);
                localStorage.setItem('role', 'EMPLOYER');
                state.loading = false;
                state.employerInfo = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(registerEmployer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(updateEmployerCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateEmployerCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateEmployerCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export const { clearRegisterState } = employerSlice.actions;
export default employerSlice.reducer;
