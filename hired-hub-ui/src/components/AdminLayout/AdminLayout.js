import classNames from 'classnames/bind';
import { Route, Routes } from 'react-router-dom';
import { Postings, PendingPosts, PostingDetail } from '../PostingManagement';
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
                    <Route path="/posting/:id" element={<PostingDetail />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminLayout;
