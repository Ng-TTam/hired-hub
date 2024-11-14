import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../config/axios';

const apiURL = `${baseURL}account/`;

// Async Thunks
export const registerAccount = createAsyncThunk('account/sign-up', async (accountData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiURL}sign-up`, accountData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const verifyOtp = createAsyncThunk('account/verify-otp', async ( otp, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${apiURL}verify-otp?otp=${otp}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const resendOtp = createAsyncThunk('account/resend-otp', async ( token, { rejectWithValue }) => {
    token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${apiURL}resend-otp`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const sendResetPassOtp = createAsyncThunk('account/send-reset-otp', async ( email , { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiURL}send-reset-otp`, { email });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const verifyResetPassOtp = createAsyncThunk('account/verify-reset-otp', async ( email, otp , { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiURL}verify-reset-otp?otp=${otp}`, { email });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const forgotPass = createAsyncThunk('account/forgot-password', async ( key, newPassAccountData , { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiURL}forgot-password?key=${key}`, newPassAccountData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

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
        resetPassLoading: false,
        resetPassSuccess: false,
        resetPassError: null,
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
        builder
            .addCase(sendResetPassOtp.pending, (state) => {
                state.resetPassLoading = true;
                state.resetPassError = null;
            })
            .addCase(sendResetPassOtp.fulfilled, (state) => {
                state.resetPassLoading = false;
                state.resetPassSuccess = true;
            })
            .addCase(sendResetPassOtp.rejected, (state, action) => {
                state.resetPassLoading = false;
                state.resetPassError = action.payload;
            });

        // Verify Reset Password OTP
        builder
            .addCase(verifyResetPassOtp.pending, (state) => {
                state.resetPassLoading = true;
                state.resetPassError = null;
            })
            .addCase(verifyResetPassOtp.fulfilled, (state) => {
                state.resetPassLoading = false;
                state.resetPassSuccess = true;
            })
            .addCase(verifyResetPassOtp.rejected, (state, action) => {
                state.resetPassLoading = false;
                state.resetPassError = action.payload;
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
    },
});

export const { clearAccountState, resetOtpState, clearResetPassState } = accountSlice.actions;
export default accountSlice.reducer;
