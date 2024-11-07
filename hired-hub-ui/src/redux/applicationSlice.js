import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8888/api/v1';

export const fetchApplication = createAsyncThunk(
    'applications/fetchApplication',
    async (applicationId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại');
            }
            const response = await axios.get(`${apiUrl}/applications/${applicationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    },
);

export const fetchApplicationInPosting = createAsyncThunk(
    'applications/fetchApplicationByPosing',
    async (postingId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại');
            }
            const response = await axios.get(`${apiUrl}/applications/posting/${postingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    },
);

export const createApplication = createAsyncThunk(
    'applications/createApplication',
    async ({ postingId, cvId, message }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại');
            }
            console.log(postingId, cvId, message);
            const response = await axios.post(
                `${apiUrl}/applications/${postingId}/${cvId}`,
                { message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.message);
        }
    },
);

export const updateApplication = createAsyncThunk(
    'applications/updateApplication',
    async ({ cvId, updatedCV }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại');
            }
            const response = await axios.put(`${apiUrl}/${cvId}`, updatedCV, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    },
);

export const deleteApplication = createAsyncThunk(
    'applications/deleteApplication',
    async (applicationId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token không tồn tại');
            }
            const response = await axios.delete(`${apiUrl}/applications/${applicationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    },
);

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        application: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetApplication: (state) => {
            state.application = null; // Reset lại application
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.application = action.payload;
            })
            .addCase(fetchApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchApplicationInPosting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplicationInPosting.fulfilled, (state, action) => {
                state.loading = false;
                state.application = action.payload;
            })
            .addCase(fetchApplicationInPosting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { resetApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
