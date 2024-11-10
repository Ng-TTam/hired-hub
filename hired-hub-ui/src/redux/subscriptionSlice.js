import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosPro, { baseURL } from '../config/axios';

const apiURL = `${baseURL}subscription`;

export const fetchSubscipptionStatus = createAsyncThunk(
    'subscriptions/fetchSubscriptionStatus',
    async (companyId, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiURL}/check-status`, {
                params: {
                    companyId,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const createSubscription = createAsyncThunk(
    'subscriptions/createSubscription',
    async (companyId, { rejectWithValue }) => {
        try {
            await axiosPro.post(`${apiURL}/subscribe`, {
                companyId,
            });
            return true;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const deleteSubscription = createAsyncThunk(
    'subscriptions/deleteSubscription',
    async (companyId, { rejectWithValue }) => {
        try {
            await axiosPro.post(`${apiURL}/unsubscribe`, {
                companyId,
            });
            return true;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

const subscriptionSlice = createSlice({
    name: 'subscriptions',
    initialState: {
        subscribed: false,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscipptionStatus.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchSubscipptionStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribed = action.payload.data.subscribed;
            })
            .addCase(fetchSubscipptionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(createSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubscription.fulfilled, (state) => {
                state.loading = false;
                state.subscribed = true;
            })
            .addCase(createSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteSubscription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSubscription.fulfilled, (state) => {
                state.loading = false;
                state.subscribed = false;
            })
            .addCase(deleteSubscription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default subscriptionSlice.reducer;
