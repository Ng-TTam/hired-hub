import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateCompanyForm from '../components/CreateCompanyForm/CreateCompanyForm';
import Dashboard from '../pages/CMS/Dashboard';
import PostingCreation from '../pages/CMS/PostCreation';
import CVReview from '../components/ProfileCV/CVReview/CVReview';
import PostingReview from '../components/ManageCandidate/PostingReview/PostingReview';

const BussinessRoutes = () => {
    return (
        <Routes>
            <Route path="/company/create" element={<CreateCompanyForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posting/create" element={<PostingCreation />} />
            <Route path='cv-review/:applicationId'element={<CVReview />}/>
            <Route path="/posting/:id" element={<PostingReview />} />
        </Routes>
    );
};

export default BussinessRoutes;
