import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosPro, { baseURL } from '../config/axios';

const apiUrl = `${baseURL}user`;

export const fetchUserInformation = createAsyncThunk('user/fetchUserInformation', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosPro.get(apiUrl);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const updateInformation = createAsyncThunk('user/updateInformation', async (infor, { rejectWithValue }) => {

    try {
        const response = await axiosPro.post(`${apiUrl}/update-profile`, infor, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async ({ criteria, pageable }, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiUrl}/all`, {
                params: { ...criteria, ...pageable },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosPro.get(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        users: [],
        entity: null,
        totalPages: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetch User Information
            .addCase(fetchUserInformation.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(fetchUserInformation.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(fetchUserInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // update Information
            .addCase(updateInformation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInformation.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

        // fetch All Users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.users = [];
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.entity = null;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.entity = action.payload.data;
                state.loading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default userSlice.reducer;
