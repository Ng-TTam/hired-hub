import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosPro, { baseURL } from '../config/axios';

const apiUrl = 'http://localhost:8888/api/v1';

export const fetchApplications = createAsyncThunk('applications/fetchApplications', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosPro.get(`${apiUrl}/employer/applications`);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});

export const fetchApplicationsJobSeeker = createAsyncThunk('applications/fetchApplicationsJobSeeker', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosPro.get(`${apiUrl}/jobSeeker/applications`);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});

export const fetchApplicationInPosting = createAsyncThunk(
    'applications/fetchApplicationByPosing',
    async (postingId, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiUrl}/applications/posting/${postingId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    },
);

export const fetchApplication = createAsyncThunk(
    'applications/fetchApplication',
    async (applicationId, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiUrl}/applications/${applicationId}`);
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
            console.log(postingId, cvId, message);
            const response = await axiosPro.post(
                `${apiUrl}/applications/${postingId}/${cvId}`,
                { message });
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
            const response = await axiosPro.put(`${apiUrl}/${cvId}`, updatedCV);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    },
);

export const setApplicationStatus = createAsyncThunk(
    'applications/setStatus', 
    async({applicationId, applicationStatus}, {rejectWithValue}) =>{
        try {
            console.log("ddmmm", applicationId);
            const response = await axiosPro.put(`${apiUrl}/applications/${applicationId}`, applicationStatus);
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
            const response = await axiosPro.delete(`${apiUrl}/applications/${applicationId}`);
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
        applications: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetApplication: (state) => {
            state.application = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchApplicationsJobSeeker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplicationsJobSeeker.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(fetchApplicationsJobSeeker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

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
            })

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
    },
});
export const { resetApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
