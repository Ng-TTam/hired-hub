import classNames from 'classnames/bind';
import { Route, Routes } from 'react-router-dom';
import JobCategoryManagement from '../JobCategoryManagement';
import PositionCategoryManagement from '../PositionCategoryManagement';
import { PendingPosts, PostingDetail, Postings } from '../PostingManagement';
import Users, { Employers, PendingEmployers, UserDetail } from '../UserManagement';
import styles from './AdminLayout.module.scss';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

function AdminLayout() {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('content')}>
                <Routes>
                    <Route path="/postings/pending" element={<PendingPosts />} />
                    <Route path="/postings" element={<Postings />} />
                    <Route path="/postings/:id" element={<PostingDetail />} />

                    <Route path="/users" element={<Users />} />
                    <Route path="/employers/pending" element={<PendingEmployers />} />
                    <Route path="/employers" element={<Employers />} />
                    <Route path="/users/:id" element={<UserDetail />} />

                    <Route path="/job-categories" element={<JobCategoryManagement />} />
                    <Route path="/positions" element={<PositionCategoryManagement />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminLayout;
