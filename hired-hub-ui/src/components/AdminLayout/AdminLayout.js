import classNames from 'classnames/bind';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../../pages/404';
import AdminDashboard from '../AdminDashboard';
import { CompanyDetail, default as CompanyManagement } from '../CompanyManagement';
import JobCategoryManagement from '../JobCategoryManagement';
import PositionCategoryManagement from '../PositionCategoryManagement';
import { PostingDetail, Postings } from '../PostingManagement';
import UpdateEmployerCompany from '../UpdateEmployerCompany';
import Users, { Employers, UserDetail } from '../UserManagement';
import styles from './AdminLayout.module.scss';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

function AdminLayout() {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('content')}>
                <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />

                    <Route path="/postings/pending" element={<Postings key={'pending-posts'} status={'PENDING'} />} />
                    <Route path="/postings" element={<Postings key={'posts'} />} />
                    <Route path="/postings/:id" element={<PostingDetail />} />

                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<UserDetail />} />

                    <Route
                        path="/employers/pending"
                        element={<Employers key={'pending-employers'} status={'PENDING'} />}
                    />
                    <Route path="/employers" key={'employers'} element={<Employers />} />
                    <Route path="/employers/:id" element={<UserDetail />} />

                    <Route path="/companies/pending" element={<CompanyManagement key={'pending'} />} />
                    <Route path="/companies" element={<CompanyManagement key={'all'} isActive />} />
                    <Route path="/companies/:id" element={<CompanyDetail />} />

                    <Route path="/job-categories" element={<JobCategoryManagement />} />
                    <Route path="/positions" element={<PositionCategoryManagement />} />

                    <Route path="company-update" element={<UpdateEmployerCompany />} />

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminLayout;
