import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Posting from '../components/Posting';
import PostingFilter from '../components/PostingFilter';
import Auth from '../pages/Home/Auth';
import SignUp from '../pages/Home/SignUp';
import VerifyOtp from '../pages/Home/VerifyOtp';
import Logout from '../components/Logout';
import CompanyDetail from '../components/CompanyDetail';

const GuessRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" exact element={<DefaultLayout children={<PostingFilter />} />} />
            <Route path="/posting/:id" exact element={<DefaultLayout children={<Posting />} />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path='/verify-otp' element={<VerifyOtp />} />
            <Route path='/reset-password' element/>
            <Route path="/company/:id" element={<DefaultLayout children={<CompanyDetail />} />} />
        </Routes>
    );
};

export default GuessRoutes;
