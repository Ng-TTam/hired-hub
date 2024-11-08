import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../config/axios';

const apiUrl = `${baseURL}posting`;

export const fetchPostings = createAsyncThunk(
    'postings/fetchPostings',
    async ({ criteria, pageable }, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiUrl, {
                params: { ...criteria, ...pageable },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data.data || error.message);
        }
    },
);

export const fetchCompanyPostings = createAsyncThunk(
    'postings/fetchCompanyPostings',
    async ({ id, criteria, pageable }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/by-company/${id}`, { params: { ...criteria, ...pageable } });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data.data);
        }
    },
);

export const fetchPosting = createAsyncThunk('postings/fetchPosting', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

const postingSlice = createSlice({
    name: 'postings',
    initialState: {
        loading: false,
        postings: [],
        posting: null,
        totalPages: 0,
        totalElements: 0,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostings.fulfilled, (state, action) => {
                state.loading = false;
                state.postings = action.payload.data.data;
                state.totalPages = action.payload.data.totalPages;
                state.totalElements = action.payload.data.totalElements;
            })
            .addCase(fetchPostings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPosting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosting.fulfilled, (state, action) => {
                state.posting = false;
                state.posting = action.payload.data;
                state.error = null;
            })
            .addCase(fetchPosting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchCompanyPostings.pending, (state, action) => {
                state.loading = true;
                state.postings = [];
                state.error = null;
            })
            .addCase(fetchCompanyPostings.fulfilled, (state, action) => {
                state.loading = false;
                state.postings = action.payload.data.data;
                state.totalPages = action.payload.data.totalPages;
                state.totalElements = action.payload.data.totalElements;
            })
            .addCase(fetchCompanyPostings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default postingSlice.reducer;
