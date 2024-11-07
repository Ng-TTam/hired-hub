import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Posting from '../components/Posting';
import PostingFilter from '../components/PostingFilter';
import Auth from '../pages/Home/Auth';
import SignUp from '../pages/Home/SignUp';
import Logout from '../components/Logout';

const GuessRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" exact element={<DefaultLayout children={<PostingFilter />} />} />
            <Route path="/posting/:id" exact element={<DefaultLayout children={<Posting />} />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/sign-up" element={<SignUp />} />{' '}
        </Routes>
    );
};

export default GuessRoutes;
