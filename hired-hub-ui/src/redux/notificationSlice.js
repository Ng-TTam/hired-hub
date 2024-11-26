import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../config/axios';

const apiUrl = 'notification';

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (pageable, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiUrl, {
                params: { ...pageable },
            });

            const data = response.data.data;
            const unreadCount = parseInt(response.headers['x-unread-count'], 10) || 0;

            return { data, unreadCount };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const markAsRead = createAsyncThunk('notifications/markAsRead', async (notificationId) => {
    const response = await axios.get(`${apiUrl}/mark-as-read/${notificationId}`);
    return response.data;
});

export const markAsReadAll = createAsyncThunk('notifications/markAsReadAll', async () => {
    const response = await axios.get(`${apiUrl}/mark-as-read-all`);
    return response.data;
});

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        loading: false,
        notifications: [],
        unreadCount: 0,
        totalPages: 0,
        totalElements: 0,
        error: null,
        updated: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.data.data;
                state.totalPages = action.payload.data.totalPages;
                state.totalElements = action.payload.data.totalElements;
                state.unreadCount = action.payload.unreadCount;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(markAsRead.pending, (state) => {
                state.loading = true;
                state.updated = false;
            })
            .addCase(markAsRead.fulfilled, (state) => {
                state.unreadCount = Math.max(state.unreadCount - 1, 0);
                state.updated = true;
            })
            .addCase(markAsReadAll.pending, (state) => {
                state.loading = true;
                state.updated = false;
            })
            .addCase(markAsReadAll.fulfilled, (state) => {
                state.unreadCount = 0;
                state.updated = true;
            });
    },
});

export default notificationSlice.reducer;
