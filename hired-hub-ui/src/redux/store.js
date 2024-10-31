import { configureStore } from '@reduxjs/toolkit';
import provinceReducer from './provinceSlice';
import positionCategoryReducer from './postionCategorySlice';
import jobCategoryReducer from './jobCategorySlice';
import postingReducer from './postingSlice';

const store = configureStore({
    reducer: {
        provinces: provinceReducer,
        positionCategories: positionCategoryReducer,
        jobCategories: jobCategoryReducer,
        postings: postingReducer,
    },
});

export default store;
