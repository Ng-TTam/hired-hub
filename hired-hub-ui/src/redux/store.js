import { configureStore } from '@reduxjs/toolkit';
import provinceReducer from './provinceSlice';
import positionCategoryReducer from './postionCategorySlice';
import jobCategoryReducer from './jobCategorySlice';
import postingReducer from './postingSlice';
import authenticationReducer from './authenticationSlice';
import userReducer from './userSlice';
import cvReducer from './cvSlice';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        user: userReducer,
        provinces: provinceReducer,
        positionCategories: positionCategoryReducer,
        jobCategories: jobCategoryReducer,
        postings: postingReducer,
        cv: cvReducer,
    },
});

export default store;
