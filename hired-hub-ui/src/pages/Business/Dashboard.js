import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateCompanyForm from '../../components/CreateCompanyForm/CreateCompanyForm';
import DashboardDefault from '../../components/DashboardDefault/DashboardDefault';
import ManageCandidate from '../../components/ManageCandidate/ManageCandidate';
import NavbarCMS from '../../components/NavbarCMS/NavbarCMS';
import PostingJob from '../../components/PostingJob/PostingJob';
import PostingStat from '../../components/PostingStat/PostingStat';
import ProgressSteps from '../../components/ProgressStep';
import Sidebar from '../../components/Sidebar/Sidebar';
import UpdateEmployerCompany from '../../components/UpdateEmployerCompany';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="topNav" style={{ flex: 1 }}>
                <NavbarCMS />
                <div className="content" style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/dashboard" element={<DashboardDefault />} />
                        <Route path="/posting-job" element={<PostingJob />} />
                        <Route path="/manage-candidate" element={<ManageCandidate />} />
                        {/* <Route path="/posting-stat" element={<PostingStat />} /> */}
                        <Route path="/create-post" element={<ProgressSteps />} />
                        <Route path="/company/create" element={<CreateCompanyForm />} />
                        <Route path="/update-company" element={<UpdateEmployerCompany />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
