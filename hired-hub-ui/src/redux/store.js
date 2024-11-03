import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice';
import jobCategoryReducer from './jobCategorySlice';
import notificationReducer from './notificationSlice';
import postingReducer from './postingSlice';
import positionCategoryReducer from './postionCategorySlice';
import provinceReducer from './provinceSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        user: userReducer,
        provinces: provinceReducer,
        positionCategories: positionCategoryReducer,
        jobCategories: jobCategoryReducer,
        postings: postingReducer,
        notifications: notificationReducer,
    },
});

export default store;
