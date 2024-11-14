import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const CMSRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard/*" element={<AdminLayout />} />
        </Routes>
    );
};

export default CMSRoutes;
