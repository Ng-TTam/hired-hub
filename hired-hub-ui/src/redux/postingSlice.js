import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosPro, { baseURL } from '../config/axios';

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

export const fetchEmployerPostings = createAsyncThunk(
    'postings/fetchEmployerPostings',
    async ( { page, size }, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${apiUrl}/self`, {
                params: { page, size },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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

export const fetchAdminPostings = createAsyncThunk(
    'postings/fetchAdminPostings',
    async ({ criteria, pageable }, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiUrl}/admin`, { params: { ...criteria, ...pageable } });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
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

export const updatePosting = createAsyncThunk('postings/updatePosting', async (posting, { rejectWithValue }) => {
    try {
        const response = await axiosPro.put(`${apiUrl}/${posting.id}`, posting);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});

export const updateStatus = createAsyncThunk(
    'postings/updateStatus', async ({ postingId, status }, { rejectWithValue }) => {
        status === 'ACTIVATE' ? status = 'DEACTIVATE' : status = 'ACTIVATE';
        try {
            const response = await axiosPro.put(`${apiUrl}/update-status`, { postingId, status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

const postingSlice = createSlice({
    name: 'postings',
    initialState: {
        loading: false,
        postings: [],
        posting: null,
        totalPages: 0,
        totalElements: 0,
        error: null,
        success: false,
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
        reset: (state) => {
            state.posting = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPosting.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createPosting.fulfilled, (state) => {
                state.loading = false;
                // state.posting = null;
                state.success = true;
            })
            .addCase(createPosting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetch employer posting
            .addCase(fetchEmployerPostings.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.postings = [];
            })
            .addCase(fetchEmployerPostings.fulfilled, (state, action) => {
                state.loading = false;
                state.postings = action.payload.data.data;
                state.totalPages = action.payload.data.totalPages;
                state.totalElements = action.payload.data.totalElements;
            })
            .addCase(fetchEmployerPostings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetch postings
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
            })
            .addCase(fetchAdminPostings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminPostings.fulfilled, (state, action) => {
                state.loading = false;
                state.postings = action.payload.data.data;
                state.totalPages = action.payload.data.totalPages;
                state.totalElements = action.payload.data.totalElements;
            })
            .addCase(fetchAdminPostings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            //update status
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateStatus.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPosting, setPostingJobDescription, reset } = postingSlice.actions;
export default postingSlice.reducer;
