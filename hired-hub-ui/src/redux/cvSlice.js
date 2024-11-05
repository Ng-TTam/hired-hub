import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8888/api/v1/cv';

export const fetchCVs = createAsyncThunk('cv/fetchCVs', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token không tồn tại');
        }
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data); 
    }
});

export const fetchCV = createAsyncThunk('cv/fetchCV', async (id, {rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token'); 
        if (!token) {
            throw new Error('Token không tồn tại'); 
        }
        const response = await axios.get(`${apiUrl}/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data; 
    } catch (error) {
        return rejectWithValue(error.response?.message); 
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
