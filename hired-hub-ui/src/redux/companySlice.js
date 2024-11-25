import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../config/axios';
import axiosPro from '../config/axios';
import { notification } from 'antd';

const apiURL = `${baseURL}company`;

export const fetchAllCompanies = createAsyncThunk(
    'companies/fetchAllCompanies',
    async ({ companyName, page, size }, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiURL, {
                params: {
                    companyName,
                    page,
                    size,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const fetchCompany = createAsyncThunk('companies/fetchCompany', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
});

export const fetchFilterCompanies = createAsyncThunk(
    'companies/fetchFilter',
    async ({ criteria, pageable }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiURL}/all`, {
                params: { ...criteria, ...pageable },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.reponse.data);
        }
    },
);

export const createCompany = createAsyncThunk('companies/createCompany', async (company, { rejectWithValue }) => {
    try {
        const response = await axiosPro.post(apiURL, company, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        notification.success({
            message: 'Thành công',
            description: 'Tạo công ty thành công',
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
        notification.error({
            message: 'Thất bại',
            description: `Tạo công ty thất bại - ${
                error.response.data.message || error.response.data || 'lỗi bất định'
            }`,
        });
        return rejectWithValue(error.response.data.message || error.response.data);
    }
});

export const fetchByCurrentUserLogin = createAsyncThunk(
    'companies/fetchByCurrentUserLogin',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosPro.get(`${apiURL}/self`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

const companySlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        company: null,
        totalPages: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCompanies.pending, (state) => {
                state.companies = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload.data;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchAllCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCompany.pending, (state, aciton) => {
                state.loading = true;
                state.company = null;
                state.error = null;
            })
            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload.data;
            })
            .addCase(fetchCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFilterCompanies.pending, (state) => {
                state.companies = [];
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilterCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload.data;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchFilterCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchByCurrentUserLogin.pending, (state) => {
                state.loading = true;
                state.company = null;
                state.error = null;
            })
            .addCase(fetchByCurrentUserLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload.data;
            })
            .addCase(fetchByCurrentUserLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default companySlice.reducer;
