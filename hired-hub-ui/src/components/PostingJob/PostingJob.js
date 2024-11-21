import React, { useEffect, useState } from 'react';
import '../../assets/css/Table.scss';
import './PostingJob.scss';
import Pagination from '../Pagination/Pagination';
import { Pause, PenBox, PenBoxIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { fetchEmployerPostings } from '../../redux/postingSlice';
import { formatDateTime } from '../../utils';

const PostingJob = () => {
    const dispatch = useDispatch();
    const { postings, totalPages, loading } = useSelector((state) => state.postings);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        dispatch(fetchEmployerPostings({ page: currentPage, size: pageSize }));
    }, [dispatch, currentPage]);

    const handleOnPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {loading ? (
                <div className="loading">Đang tải...</div>
            ) : postings.length > 0 ? (
                <div style={{ flex: 1, padding: '0px 20px' }}>
                    <div className="post-button" style={{ fontSize: '16px' }}>
                        <Link to="/business/create-post">Đăng tuyển</Link>
                    </div>
                    <table className="custom-table" style={{ marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th>Tin tuyển dụng</th>
                                <th>Công việc chính</th>
                                <th>Công việc liên quan</th>
                                <th>Vị trí</th>
                                <th>Ngày đăng tin</th>
                                <th>Ngày hết hạn</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {postings.map((posting) => (
                                <tr key={posting.id}>
                                    <td>{posting.title}</td>
                                    <td>{posting.mainJob.name}</td>
                                    <td>
                                        {posting.subJobs.map((subJob) => (
                                            <Tag color="blue">{subJob.name}</Tag>
                                        ))}
                                    </td>
                                    <td>{posting.position.name}</td>
                                    <td>{formatDateTime(posting.createdAt)}</td>
                                    <td>{formatDateTime(posting.expiredAt)}</td>
                                    <td>
                                        <Tag
                                            color={
                                                posting.status === 'PENDING'
                                                    ? 'gold'
                                                    : posting.status === 'ACTIVATE'
                                                    ? 'green'
                                                    : 'red'
                                            }
                                        >
                                            {posting.status === 'PENDING'
                                                ? 'Pending'
                                                : posting.status === 'ACTIVATE'
                                                ? 'Activate'
                                                : 'Inactivate'}
                                        </Tag>
                                    </td>
                                    <td>
                                        {Date.parse(posting.expiredAt) > Date.now() && (
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Button color="primary" variant="outlined">
                                                    <PenBox size={20} />
                                                </Button>
                                                <Button color="danger" variant="outlined">
                                                    <Pause size={20} />
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleOnPageChange} />
                </div>
            ) : (
                <div className="posting-nil">
                    <PenBoxIcon size={100} />
                    <h1>Đăng tin ngay</h1>
                    <span>&nbsp; Bạn chưa đăng tin tuyển dụng nào.</span>
                    <span>Vui lòng chọn đăng tuyển để đăng tin tuyển dụng</span>
                    <div className="post-button">
                        <Link to="/business/create-post">Đăng tuyển</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostingJob;
