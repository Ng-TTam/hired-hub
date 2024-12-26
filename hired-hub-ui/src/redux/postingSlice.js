import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
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

export const fetchPostingsDefault = createAsyncThunk(
    'postings/fetchPostingsDefault',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/all`, {
                params: { page, size },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data.data || error.message);
        }
    },
);

export const fetchPostingsRecommend = createAsyncThunk(
    'postings/fetchPostingsRecommend',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiUrl}/recommend`, {
                params: { page, size },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data.data || error.message);
        }
    },
);

export const fetchEmployerFilterPostings = createAsyncThunk(
    'postings/fetchEmployerFilterPostings',
    async ({ criteria, pageable }, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiUrl}/employer`, { params: { ...criteria, ...pageable } });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
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
        const response = await axiosPro.get(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const createPosting = createAsyncThunk('postings/createPosting', async (posting, { rejectWithValue }) => {
    try {
        const response = await axiosPro.post(apiUrl, posting);
        notification.success({
            message: 'Thành công',
            description: 'Đăng tuyển thành công',
        });
        return response.data;
    } catch (error) {
        notification.error({
            message: 'Thất bại',
            description: `Cập nhật thất bại - ${error.response.data.message || error.response.data || 'lỗi bất định'}`,
        });
        return rejectWithValue(error.response?.data);
    }
});

export const updatePosting = createAsyncThunk('postings/updatePosting', async (posting, { rejectWithValue }) => {
    try {
        const response = await axiosPro.put(`${apiUrl}/${posting.id}`, posting);
        notification.success({
            message: 'Thành công',
            description: 'Chỉnh sửa tin tuyển dụng thành công',
        });
        return response.data;
    } catch (error) {
        notification.error({
            message: 'Thất bại',
            description: `Cập nhật thất bại - ${error.response.data.message || error.response.data || 'lỗi bất định'}`,
        });
        return rejectWithValue(error.response?.data);
    }
});

export const updateStatus = createAsyncThunk(
    'postings/updateStatus',
    async ({ postingId, status }, { rejectWithValue }) => {
        try {
            const response = await axiosPro.put(`${apiUrl}/update-status`, { postingId, status });
            notification.success({
                message: 'Thành công',
                description: 'Cập nhật thành công',
            });
            return response.data;
        } catch (error) {
            notification.error({
                message: 'Thất bại',
                description: `Cập nhật thất bại - ${
                    error.response.data.message || error.response.data || 'lỗi bất định'
                }`,
            });
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
                state.success = true;
            })
            .addCase(createPosting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //update posting
            .addCase(updatePosting.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updatePosting.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updatePosting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //fetch postings
            .addCase(fetchPostings.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.postings = [];
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
                state.loading = false;
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
            //employer filter
            .addCase(fetchEmployerFilterPostings.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.postings = null;
                state.success = false;
            })
            .addCase(fetchEmployerFilterPostings.fulfilled, (state, action) => {
                state.loading = false;
                state.postings = action.payload.data.data;
                state.totalPages = action.payload.data.totalPages;
                state.totalElements = action.payload.data.totalElements;
            })
            .addCase(fetchEmployerFilterPostings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //admin filter
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
            })

            //fetch postings default
            .addCase(fetchPostingsDefault.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.postings = [];
            })
            .addCase(fetchPostingsDefault.fulfilled, (state, action) => {
                state.loading = false;
                state.postings = action.payload.data.data;
                state.totalPages = action.payload.data.totalPages;
                state.totalElements = action.payload.data.totalElements;
            })
            .addCase(fetchPostingsDefault.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //fetch postings recommend
            .addCase(fetchPostingsRecommend.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.postings = [];
            })
            .addCase(fetchPostingsRecommend.fulfilled, (state, action) => {
                state.loading = false;
                state.postings = action.payload.data.data;
                state.totalPages = action.payload.data.totalPages;
                state.totalElements = action.payload.data.totalElements;
            })
            .addCase(fetchPostingsRecommend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPosting, setPostingJobDescription, reset } = postingSlice.actions;
export default postingSlice.reducer;
