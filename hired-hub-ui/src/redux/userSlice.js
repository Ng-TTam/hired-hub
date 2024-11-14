import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';
import { baseURL } from '../config/axios';

const apiUrl = `${baseURL}user`;

export const fetchUserInformation = createAsyncThunk('user/fetchUserInformation', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token không tồn tại');
    }
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
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
        user: JSON.parse(localStorage.getItem('user')) || null,
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
                localStorage.setItem('user', JSON.stringify(action.payload.data));
                state.user = action.payload.data;
            })
            .addCase(fetchUserInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
