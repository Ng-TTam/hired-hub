import { configureStore } from '@reduxjs/toolkit';
import provinceReducer from './provinceSlice';
import positionCategoryReducer from './postionCategorySlice';
import jobCategoryReducer from './jobCategorySlice';
import postingReducer from './postingSlice';
import authenticationReducer from './authenticationSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        user: userReducer,
        provinces: provinceReducer,
        positionCategories: positionCategoryReducer,
        jobCategories: jobCategoryReducer,
        postings: postingReducer,
    },
});

export default store;
