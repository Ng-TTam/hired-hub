import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosPro from '../config/axios';
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

export const fetchPosting = createAsyncThunk('postings/fetchPosting', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const createPosting = createAsyncThunk('postings/createPosting', async (posting, { rejectWithValue }) => {
    try {
        const response = await axiosPro.post(apiUrl, posting);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
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
    reducers: {
        setPosting: (state, action) => {
            state.posting = {
                ...state.posting,
                ...action.payload,
            };
        },
        setPostingJobDescription: (state, action) => {
            state.posting.jobDescription = {
                ...state.posting.jobDescription,
                ...action.payload,
            };
        },
    },
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
            .addCase(createPosting.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPosting.fulfilled, (state, action) => {
                state.loading = false;
                state.posting = action.payload.data;
            })
            .addCase(createPosting.rejected, (state, action) => {
                state.load = false;
                state.error = action.payload.message;
            });
    },
});

export const { setPosting, setPostingJobDescription } = postingSlice.actions;
export default postingSlice.reducer;
