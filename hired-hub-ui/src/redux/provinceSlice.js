import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

const apiUrl = 'province';

export const fetchProvinces = createAsyncThunk('provinces/fetchProvinces', async () => {
    const response = await axios.get(apiUrl);
    return response.data.data;
});

const provinceSlice = createSlice({
    name: 'provinces',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProvinces.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProvinces.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProvinces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default provinceSlice.reducer;
