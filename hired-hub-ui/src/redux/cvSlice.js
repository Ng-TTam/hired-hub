import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosPro, { baseURL } from '../config/axios';

const apiUrl = 'http://localhost:8888/api/v1/cv';

export const fetchCVs = createAsyncThunk('cv/fetchCVs', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosPro.get(apiUrl);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data); 
    }
});

export const fetchCV = createAsyncThunk('cv/fetchCV', async (id, {rejectWithValue }) => {
    try {
        const response = await axiosPro.get(`${apiUrl}/${id}`);
        return response.data.data; 
    } catch (error) {
        return rejectWithValue(error.response?.message); 
    }
});

export const updateCV = createAsyncThunk('cv/updateCV', async ({ cvId, updatedCV }, { rejectWithValue }) => {
    try {
        const response = await axiosPro.put(`${apiUrl}/${cvId}`, updatedCV);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});

export const createCV = createAsyncThunk('cv/createCV', async (creacteCV, { rejectWithValue }) => {
    try {
        const response = await axiosPro.post(`${apiUrl}`, creacteCV);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});

const cvSlice = createSlice({
    name: 'cv',
    initialState: {
        list: [],
        cv: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCVs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCVs.fulfilled, (state, action) => {
                state.loading = false; 
                state.list = action.payload; 
            })
            .addCase(fetchCVs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCV.pending, (state) => {
                state.loading = true; 
                state.error = null; 
            })
            .addCase(fetchCV.fulfilled, (state, action) => {
                state.loading = false; 
                state.cv = action.payload; 
            })
            .addCase(fetchCV.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cvSlice.reducer;
