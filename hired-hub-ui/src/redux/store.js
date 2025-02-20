import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import applicationReducer from './applicationSlice';
import authenticationReducer from './authenticationSlice';
import companyReducer from './companySlice';
import cvReducer from './cvSlice';
import employerReducer from './employerSilce';
import filterReducer from './filterSlice';
import jobCategoryReducer from './jobCategorySlice';
import notificationReducer from './notificationSlice';
import postingReducer from './postingSlice';
import positionCategoryReducer from './postionCategorySlice';
import provinceReducer from './provinceSlice';
import savedPostingReducer from './savedPostingSlice';
import scaleCategoryReducer from './scaleCategorySlice';
import statisticsReducer from './statisticsSlice';
import subscriptionReducer from './subscriptionSlice';
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
        cv: cvReducer,
        filter: filterReducer,
        application: applicationReducer,
        companies: companyReducer,
        subscriptions: subscriptionReducer,
        employer: employerReducer,
        account: accountReducer,
        statistics: statisticsReducer,
        savedPosting: savedPostingReducer,
        scaleCategories: scaleCategoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
