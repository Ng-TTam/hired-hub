import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Space, Table, Tag, notification } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminPostings, updateStatus } from '../../redux/postingSlice';
import { formatDateTime } from '../../utils';
import Pagination from '../Pagination';
import styles from './PostingManagement.module.scss';

const cx = classNames.bind(styles);

function PendingPosts() {
    const dispatch = useDispatch();
    const { postings, totalPages, loading } = useSelector((state) => state.postings);

    const [criteria, setCriteria] = useState({ status: 'PENDING' });
    const [pageable, setPageable] = useState({ page: 0, size: 10, sort: 'createdAt,desc' });
    const [notificationData, setNotificationData] = useState(null);

    useEffect(() => {
        dispatch(fetchAdminPostings({ criteria, pageable }));
    }, [criteria, pageable]);

    useEffect(() => {
        if (notificationData) {
            if (notificationData.type === 'error') {
                notification.error({
                    message: notificationData.message,
                    description: notificationData.description,
                });
            } else if (notificationData.type === 'success') {
                notification.success({
                    message: notificationData.message,
                    description: notificationData.description,
                });
            }
            setNotificationData(null);
        }
    }, [notificationData]);

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter.field) {
            setPageable((prev) => ({
                ...prev,
                sort: `${sorter.field},${sorter.order === 'ascend' ? 'asc' : 'desc'}`,
            }));
        }
    };

    const handleChangeStatus = async ({ postingId, status }) => {
        const resultAction = await dispatch(updateStatus({ postingId, status }));

        if (updateStatus.rejected.match(resultAction)) {
            const error = resultAction.payload;
            setNotificationData({
                type: 'error',
                message: 'Lỗi',
                description: error?.message || 'Đã có lỗi xảy ra.',
            });
        } else {
            dispatch(fetchAdminPostings({ criteria, pageable }));
            setNotificationData({
                type: 'success',
                message: 'Thành công',
                description: 'Cập nhật thành công!',
            });
        }
    };

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => pageable.page * pageable.size + index + 1,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={`/admin/dashboard/posting/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Công ty',
            dataIndex: ['company', 'name'],
            key: 'companyName',
            render: (text, record) => <Link to={`/company/${record.company.id}`}>{text}</Link>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (text, record) => formatDateTime(record.createdAt),
            key: 'createdAt',
            sorter: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                const status = record.status;
                return (
                    <Tag color={status === 'ACTIVATE' ? 'green' : status === 'PENDING' ? 'orange' : 'red'}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Tác vụ',
            key: 'actions',
            fixed: 'right',
            render: (text, record) => {
                const status = record.status;
                return (
                    <Space>
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faCheck} />}
                            onClick={() =>
                                handleChangeStatus({
                                    postingId: record.id,
                                    status: 'ACTIVATE',
                                })
                            }
                        >
                            Phê duyệt
                        </Button>
                        <Button
                            type="primary"
                            danger
                            icon={<FontAwesomeIcon icon={faBan} />}
                            onClick={() =>
                                handleChangeStatus({
                                    postingId: record.id,
                                    status: 'DEACTIVATE',
                                })
                            }
                        >
                            Từ chối
                        </Button>
                    </Space>
                );
            },
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <Table
                onChange={handleTableChange}
                columns={columns}
                dataSource={postings}
                loading={loading}
                rowKey="id"
                pagination={false}
            />
            <Pagination
                currentPage={pageable.page + 1}
                totalPages={totalPages}
                onPageChange={(page) => setPageable((prev) => ({ ...prev, page: page - 1 }))}
            />
        </div>
    );
}

export default PendingPosts;
