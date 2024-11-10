import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../config/axios';

const apiURL = `${baseURL}company`;

export const fetchCompany = createAsyncThunk('companies/fetchCompany', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});

const companySlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        company: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompany.pending, (state, aciton) => {
                state.loading = true;
                state.company = null;
                state.error = null;
            })
            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload.data;
            })
            .addCase(fetchCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default companySlice.reducer;
