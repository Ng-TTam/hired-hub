import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../config/axios';

const apiURL = `${baseURL}auth/`;
export const loginThunk = createAsyncThunk('authentication/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${apiURL}login`, { email, password });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const logoutThunk = createAsyncThunk('authentication/logout', async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await axios.post(`${apiURL}logout`, { token });
        return response.data;
    }
});

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLogin: false,
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.isLogin = false;
            localStorage.clear();
            sessionStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                state.isLogin = false;
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.data.token);
                localStorage.setItem('refresh-token', action.payload.data.refreshToken);
                localStorage.setItem('email', action.meta.arg.email);
                localStorage.setItem('isLogin', true);
                state.isLogin = true;
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLogin = false;
                state.loading = false;
                state.success = false;
                state.error = action.payload.data.message;
            })
            .addCase(logoutThunk.fulfilled, (state, action) => {
                localStorage.clear();
                state.isLogin = false;
                state.success = false;
            });
    },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
