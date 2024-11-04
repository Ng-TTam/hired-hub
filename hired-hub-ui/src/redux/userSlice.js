import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';

export const fetchUserInformation = createAsyncThunk('user/fetchUserInformation', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('user');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInformation.pending, (state, action) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchUserInformation.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(fetchUserInformation.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload.data.message;
            });
    },
});

export default userSlice.reducer;
