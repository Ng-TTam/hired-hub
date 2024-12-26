import React, { useEffect, useState } from 'react';
import '../../assets/css/Table.scss';
import './PostingJob.scss';
import Pagination from '../Pagination/Pagination';
import { PenBox, StepForwardIcon, StopCircleIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { fetchEmployerFilterPostings, updateStatus } from '../../redux/postingSlice';
import { formatDateTime } from '../../utils';
import FilterPosting from './FilterPosting/FilterPosting';
import images from '../../assets/images';

const PostingJob = () => {
    const dispatch = useDispatch();
    const { postings, totalPages, success } = useSelector((state) => state.postings);
    const [criteria, setCriteria] = useState({});
    const [pageable, setPageable] = useState({ page: 0, size: 10 });

    useEffect(() => {
        dispatch(fetchEmployerFilterPostings({ criteria, pageable }));
    }, [pageable]);

    useEffect(() => {
        if (success) {
            dispatch(fetchEmployerFilterPostings({ criteria, pageable }));
        }
    }, [success]);

    const handleSubmitStatusChange = (postingId, status) => {
        dispatch(updateStatus({ postingId, status }));
    };

    const handleOnStatusChange = (newStatus) => {
        setCriteria((prev) => ({
            ...prev,
            status: newStatus,
        }));
    };

    const handleOnSearchValueChange = (newSearchValue) => {
        setCriteria((prev) => ({
            ...prev,
            searchValue: newSearchValue,
        }));
    };

    return (
        <div style={{ flex: 1 }}>
            <FilterPosting
                criteria={criteria}
                filterStatus
                onSearchValueChange={handleOnSearchValueChange}
                onSelectedStatusChange={handleOnStatusChange}
                onClickSearch={() => dispatch(fetchEmployerFilterPostings({ criteria, pageable }))}
            />
            {postings?.length > 0 ? (
                <>
                 <table className="custom-table" style={{ marginTop: '10px' }}>
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
                         {postings?.map((posting) => (
                             <tr key={posting?.id}>
                                 <td>{posting?.title}</td>
                                 <td>{posting?.mainJob?.name}</td>
                                 <td>
                                     {posting?.subJobs.map((subJob) => (
                                         <Tag color="blue">{subJob?.name}</Tag>
                                     ))}
                                 </td>
                                 <td>{posting?.position?.name}</td>
                                 <td>{formatDateTime(posting?.createdAt)}</td>
                                 <td>{formatDateTime(posting?.expiredAt)}</td>
                                 <td>
                                     <Tag
                                         color={
                                             posting.status === 'PENDING'
                                                 ? 'gold'
                                                 : posting.status === 'ACTIVATE'
                                                 ? 'green'
                                                 : posting.status === 'DEACTIVATE'
                                                 ? 'red'
                                                 : 'purple'
                                         }
                                     >
                                         {posting.status === 'PENDING'
                                             ? 'Pending'
                                             : posting.status === 'ACTIVATE'
                                             ? 'Activate'
                                             : posting.status === 'DEACTIVATE'
                                             ? 'Deactivate'
                                             : 'Rejected'}
                                     </Tag>
                                 </td>
                                 <td>
                                     {Date.parse(posting?.expiredAt) > Date.now() && (
                                         <div style={{ display: 'flex', gap: '10px' }}>
                                             <Link to={`/business/update-post/${posting?.id}`}>
                                                 <Button color="default" variant="outlined">
                                                     <PenBox size={20} />
                                                 </Button>
                                             </Link>
                                             {posting.status === 'DEACTIVATE' && (
                                                 <Button
                                                     variant="outlined"
                                                     color="primary"
                                                     onClick={() => handleSubmitStatusChange(posting?.id, 'ACTIVATE')}
                                                 >
                                                     <StepForwardIcon size={20} />
                                                 </Button>
                                             )}
                                             {posting?.status === 'ACTIVATE' && (
                                                 <Button
                                                     color="danger"
                                                     variant="outlined"
                                                     onClick={() =>
                                                         handleSubmitStatusChange(posting?.id, 'DEACTIVATE')
                                                     }
                                                 >
                                                     <StopCircleIcon size={20} />
                                                 </Button>
                                             )}
                                         </div>
                                     )}
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
                <Pagination
                    currentPage={pageable.page + 1}
                    totalPages={totalPages}
                    onPageChange={(page) => setPageable((prev) => ({ ...prev, page: page - 1 }))}
                />
                </>
            ) : (
                <div className="no-application-table">
                    <div className="no-pa-image-appli">
                        <img src={images.emptyCV} />
                    </div>
                    <div className="no-pa-message-appli">
                        <span>Không tìm thấy bài đăng nào</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostingJob;
