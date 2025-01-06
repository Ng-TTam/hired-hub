import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosPro, { baseURL } from '../config/axios';
import { notification } from 'antd';

const apiURL = `${baseURL}account/`;

export const registerAccount = createAsyncThunk('account/sign-up', async (accountData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiURL}sign-up`, accountData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const verifyOtp = createAsyncThunk('account/verify-otp', async (otp, { rejectWithValue }) => {
    try {
        const response = await axiosPro.post(
            `${apiURL}verify-otp?otp=${otp}`,
            {});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const resendOtp = createAsyncThunk('account/resend-otp', async (token, { rejectWithValue }) => {
    try {
        const response = await axiosPro.get(`${apiURL}resend-otp`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const sendResetPassOtp = createAsyncThunk('account/send-reset-otp', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiURL}send-reset-otp`, { email });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const verifyResetPassOtp = createAsyncThunk(
    'account/verify-reset-otp',
    async ({email, otp}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiURL}verify-reset-otp?otp=${otp}`, { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    },
);

export const forgotPass = createAsyncThunk(
    'account/forgot-password',
    async ({key, newPassAccountData}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiURL}forgot-password?key=${key}`, newPassAccountData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    },
);

export const updateStatus = createAsyncThunk(
    'account/updateStatus',
    async ({ accountId, status }, { rejectWithValue }) => {
        try {
            const response = await axiosPro.post(`${apiURL}update-status`, { accountId, status });
            notification.success({
                message: 'Thành công',
                description: 'Cập nhật trạng thái thành công',
            });
            return response.data;
        } catch (error) {
            notification.error({
                message: 'Thất bại',
                description: `Cập nhật trạng thái thất bại - ${error.response.data.message}`,
            });
            return rejectWithValue(error.response.data);
        }
    },
);

// Redux Slice
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accountInfo: null,
        isLogin: false,
        loading: false,
        error: null,
        success: false,
        otpLoading: false,
        otpSuccess: false,
        otpError: null,
        otpResendLoading: false,
        otpResendSuccess: false,
        otpResendError: null,
        otpResetPassLoading: false,
        otpResetPassSuccess: false,
        otpResetPassError: null,
        keyResetPass: null,
        resetPassLoading: false,
        resetPassSuccess: false,
        resetPassError: null,
        updateSuccess: false,
    },
    reducers: {
        clearAccountState: (state) => {
            state.isLogin = false;
            state.loading = false;
            state.accountInfo = null;
            state.error = null;
            state.success = false;
        },
        resetOtpState: (state) => {
            state.otpLoading = false;
            state.otpSuccess = false;
            state.otpError = null;
        },
        clearResetPassState: (state) => {
            state.resetPassLoading = false;
            state.resetPassSuccess = false;
            state.resetPassError = null;
        },
        clearOTPResetPassState: (state) => {
            state.otpResetPassLoading = false;
            state.otpResetPassSuccess = false;
            state.otpResetPassError = null;
            state.keyResetPass = null;
        },
    },
    extraReducers: (builder) => {
        // Register Account
        builder
            .addCase(registerAccount.pending, (state) => {
                state.loading = true;
                state.isLogin = false;
                state.error = null;
                state.success = false;
            })
            .addCase(registerAccount.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.data.token);
                localStorage.setItem('refresh-token', action.payload.data.refreshToken);
                localStorage.setItem('email', action.meta.arg.email);
                localStorage.setItem('isLogin', true);
                localStorage.setItem('role', 'JOB_SEEKER');
                state.isLogin = true;
                state.loading = false;
                state.accountInfo = action.payload;
                state.success = true;
            })
            .addCase(registerAccount.rejected, (state, action) => {
                state.isLogin = false;
                state.loading = false;
                state.error = action.payload;
            });

        // Verify OTP
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.otpLoading = true;
                state.otpSuccess = false;
                state.otpError = null;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.otpLoading = false;
                state.otpSuccess = true;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.otpLoading = false;
                state.otpError = action.payload;
            });

        // Resend OTP
        builder
            .addCase(resendOtp.pending, (state) => {
                state.otpResendLoading = true;
                state.otpResendError = null;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.otpResendLoading = false;
                state.otpResendSuccess = true;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.otpResendLoading = false;
                state.otpResendError = action.payload;
            });

        // Send Reset Password OTP
        // builder
        //     .addCase(sendResetPassOtp.pending, (state) => {
        //         state.otpResetPassLoading = true;
        //         state.otpResetPassError = null;
        //     })
        //     .addCase(sendResetPassOtp.fulfilled, (state) => {
        //         state.otpResetPassLoading = false;
        //         state.otpResetPassSuccess = true;
        //     })
        //     .addCase(sendResetPassOtp.rejected, (state, action) => {
        //         state.otpResetPassLoading = false;
        //         state.otpResetPassError = action.payload;
        //     });

        // Verify Reset Password OTP
        builder
            .addCase(verifyResetPassOtp.pending, (state) => {
                state.otpResetPassLoading = true;
                state.otpResetPassError = null;
            })
            .addCase(verifyResetPassOtp.fulfilled, (state, action) => {
                state.otpResetPassLoading = false;
                state.keyResetPass = action.payload;
                state.otpResetPassSuccess = true;
            })
            .addCase(verifyResetPassOtp.rejected, (state, action) => {
                state.otpResetPassLoading = false;
                state.otpResetPassError = action.payload;
            });

        // Forgot Password
        builder
            .addCase(forgotPass.pending, (state) => {
                state.resetPassLoading = true;
                state.resetPassError = null;
            })
            .addCase(forgotPass.fulfilled, (state) => {
                state.resetPassLoading = false;
                state.resetPassSuccess = true;
            })
            .addCase(forgotPass.rejected, (state, action) => {
                state.resetPassLoading = false;
                state.resetPassError = action.payload;
            });

        builder
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
                state.updateSuccess = false;
            })
            .addCase(updateStatus.fulfilled, (state) => {
                state.updateSuccess = true;
            });
    },
});

export const { clearAccountState, resetOtpState, clearResetPassState, clearOTPResetPassState } = accountSlice.actions;
export default accountSlice.reducer;
