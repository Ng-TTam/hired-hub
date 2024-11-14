import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateCompanyForm from '../components/CreateCompanyForm/CreateCompanyForm';
import Dashboard from '../pages/CMS/Dashboard';
import PostingCreation from '../pages/CMS/PostCreation';

const BussinessRoutes = () => {
    return (
        <Routes>
            <Route path="/company/create" element={<CreateCompanyForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posting/create" element={<PostingCreation />} />
        </Routes>
    );
};

export default BussinessRoutes;
