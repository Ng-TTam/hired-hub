import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CompanyDetail from '../components/CompanyDetail';
import DefaultLayout from '../components/DefaultLayout';
import EmployerRegister from '../components/EmloyerRegister';
import Logout from '../components/Logout';
import Posting from '../components/Posting';
import PostingFilter from '../components/PostingFilter';
import Auth from '../pages/Home/Auth';
import SignUp from '../pages/Home/SignUp';
import VerifyOtp from '../pages/Home/VerifyOtp';
import PageNotFound from '../pages/404';

const GuessRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact element={<DefaultLayout children={<PostingFilter />} />} />

            <Route path="/login" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element />

            <Route path="/business-sign-up" element={<EmployerRegister />} />

            <Route path="/posting/:id" exact element={<DefaultLayout children={<Posting />} />} />
            <Route path="/company/:id" element={<DefaultLayout children={<CompanyDetail />} />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default GuessRoutes;
