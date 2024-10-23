import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Home/Auth';
import Home from '../pages/Home/Home';

const HomeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path = "/login" element={<Auth />} />
        </Routes>
    );
}

export default HomeRoutes;