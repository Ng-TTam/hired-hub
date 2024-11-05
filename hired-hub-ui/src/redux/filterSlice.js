import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    criteria: {
        searchValue: null,
        provinceId: null,
        districtId: null,
        jobCategoryId: null,
        positionId: null,
        minSalary: null,
        maxSalary: null,
        experienceRequire: null,
        jobType: null,
    },
    pagination: {
        page: 0,
        size: 12,
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.criteria.searchValue = action.payload;
        },
        setProvinceId: (state, action) => {
            state.criteria.provinceId = action.payload;
        },
        setDistrictId: (state, action) => {
            state.criteria.districtId = action.payload;
        },
        setJobCategoryId: (state, action) => {
            state.criteria.jobCategoryId = action.payload;
        },
        setPositionId: (state, action) => {
            state.criteria.positionId = action.payload;
        },
        setMinSalary: (state, action) => {
            state.criteria.minSalary = action.payload;
        },
        setMaxSalary: (state, action) => {
            state.criteria.maxSalary = action.payload;
        },
        setExperienceRequire: (state, action) => {
            state.criteria.experienceRequire = action.payload;
        },
        setJobType: (state, action) => {
            state.criteria.jobType = action.payload;
        },

        setCurrentPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setPageSize: (state, action) => {
            state.pagination.size = action.payload;
        },

        setCriteria: (state, action) => {
            state.criteria = action.payload;
            state.pagination.page = 0;
        },
        resetAndSetProvince: (state, action) => {
            state.criteria = { ...initialState.criteria, provinceId: action.payload };
            state.pagination = { ...initialState.pagination };
        },
        resetAndSetDistrict: (state, action) => {
            state.criteria = {
                ...initialState.criteria,
                provinceId: action.payload.provinceId,
                districtId: action.payload.districtId,
            };
            state.pagination = { ...initialState.pagination };
        },
        resetAndSetJobCategory: (state, action) => {
            state.criteria = {
                ...initialState.criteria,
                jobCategoryId: action.payload,
            };
            state.pagination = { ...initialState.pagination };
        },

        resetFilters: (state) => {
            state = { ...initialState };
        },
    },
});

export const {
    setSearchValue,
    setProvinceId,
    setDistrictId,
    setJobCategoryId,
    setPositionId,
    setMinSalary,
    setMaxSalary,
    setExperienceRequire,
    setJobType,
    setCurrentPage,
    setPageSize,
    setTotalElements,
    setCriteria,
    resetAndSetProvince,
    resetAndSetDistrict,
    resetAndSetJobCategory,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
