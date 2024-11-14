import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import PostingInfoBase from '../components/ProgressStep/PostingInfoBase/PostingInfoBase';
import UserManagement from '../components/UserManagement';
import UserDetail from '../components/UserManagement/UserDetail';
import Dashboard from '../pages/CMS/Dashboard';
import PostingCreation from '../pages/CMS/PostCreation';

const CMSRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/dashboard" element={<Dashboard />} />*/}
            <Route path="/postinginfo" element={<PostingInfoBase />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posting/create" element={<PostingCreation />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/admin/user" element={<UserManagement />} />
            <Route path="/user/:userId" element={<UserDetail />} />
        </Routes>
    );
};

export default CMSRoutes;
