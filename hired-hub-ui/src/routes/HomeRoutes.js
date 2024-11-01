import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Home/Auth';
import Home from '../pages/Home/Home';
import DefaultLayout from '../components/DefaultLayout';
import PostingFilter from '../components/PostingFilter';
import Posting from '../components/Posting';

const HomeRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" exact element={<DefaultLayout children={<PostingFilter />} />} />
            <Route path="/posting/:id" exact element={<DefaultLayout children={<Posting />} />} />
            <Route path="/login" element={<Auth />} />
        </Routes>
    );
};

export default HomeRoutes;
