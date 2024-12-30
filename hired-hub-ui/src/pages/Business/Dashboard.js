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
import UpdateInfor from '../../components/UpdateInfor/UpdateInfor';
import { PostingDetail } from '../../components/PostingManagement';
import PageNotFound from '../404';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="topNav" style={{ /*display: 'flex', flexDirection: 'column',*/ flex: 1 }}>
                <NavbarCMS />
                <div
                    className="content"
                    style={{ padding: '16px', flex: 1, maxHeight: 'calc(100vh - 65px)', overflowY: 'auto' }}
                >
                    <Routes>
                        <Route path="/dashboard" element={<DashboardDefault />} />
                        <Route path="/posting-job" element={<PostingJob />} />
                        <Route path="/manage-candidate" element={<ManageCandidate />} />
                        <Route path="/manage-candidate/posting/:id" element={<PostingDetail />} />
                        {/* <Route path="/posting-stat" element={<PostingStat />} /> */}
                        <Route path="/create-post" element={<ProgressSteps />} />
                        <Route path="/update-post/:id" element={<ProgressSteps />} />
                        <Route path="/update-company" element={<UpdateEmployerCompany />} />
                        <Route path="/update-information" element={<UpdateInfor />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
