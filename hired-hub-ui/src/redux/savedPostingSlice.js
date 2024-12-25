import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosPro, { baseURL } from '../config/axios';

const apiURL = `${baseURL}saved-post`;

export const fetchSavedPosts = createAsyncThunk("saved-post/fetchSavedPost", async(_,{rejectWithValue}) =>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token không tồn tại');
    }
    try {
        const response = await axios.get(`${apiURL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const savePostingStatus = createAsyncThunk("saved-post/status",async(postingId, { rejectWithValue }) =>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token không tồn tại');
    }
    try {
        const response = await axios.get(`${apiURL}/check-status/${postingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const savePosting = createAsyncThunk("saved-post/saved",async(postingId, { rejectWithValue }) =>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token không tồn tại');
    }
    try {
        const response = await axios.post(`${apiURL}`, postingId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const unsavePosting = createAsyncThunk("saved-post/unsaved",async(postingId, { rejectWithValue }) =>{
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token không tồn tại');
    }
    try {
        const response = await axios.post(`${apiURL}/unsaved-post`, postingId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});



const savedPostingSlice = createSlice({
    name: 'savedPosting',
    initialState: {
        savedPostings : [],
        savedStatus : null,
        loading: null,
        error:null,
        count:null,
    },
    reducers: {
        resetSavePost: (state) => {
            state.savedPostings = null;
            state.savedStatus = null;
            state.count = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSavedPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSavedPosts.fulfilled, (state, action) => {
                state.loading = false; 
                state.savedPostings = action.payload.data.data; 
                state.count = action.payload.data.totalElements;
            })
            .addCase(fetchSavedPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(savePostingStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(savePostingStatus.fulfilled, (state, action) => {
                state.loading = false; 
                state.savedStatus = action.payload.data.saved; 
            })
            .addCase(savePostingStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { resetSavePost } = savedPostingSlice.actions;
export default savedPostingSlice.reducer;
