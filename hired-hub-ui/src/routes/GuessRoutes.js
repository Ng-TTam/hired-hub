import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Posting from '../components/Posting';
import PostingFilter from '../components/PostingFilter';
import Auth from '../pages/Home/Auth';
import Logout from '../components/Logout';
import ProfileCV from '../components/ProfileCV/ProfileCV';
import CV from '../components/ProfileCV/CV/CV';

const GuessRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" exact element={<DefaultLayout children={<PostingFilter />} />} />
            <Route path="/posting/:id" exact element={<DefaultLayout children={<Posting />} />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/hoso&cv" exact element={<DefaultLayout children={<ProfileCV/>}/>} />
            <Route path="/tao-cv" exact element={<DefaultLayout children={<CV/>}/>} />
        </Routes>
    );
};

export default GuessRoutes;
