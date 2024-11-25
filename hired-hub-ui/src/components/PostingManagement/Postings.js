import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Space, Table, Tag, Modal } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminPostings, updateStatus } from '../../redux/postingSlice';
import { formatDateTime } from '../../utils';
import Pagination from '../Pagination';
import styles from './PostingManagement.module.scss';

const cx = classNames.bind(styles);

function Postings() {
    const dispatch = useDispatch();
    const { postings, totalPages, loading, success } = useSelector((state) => state.postings);

    const [criteria, setCriteria] = useState();
    const [pageable, setPageable] = useState({ page: 0, size: 10, sort: 'createdAt,desc' });

    useEffect(() => {
        dispatch(fetchAdminPostings({ criteria, pageable }));
    }, [criteria, pageable]);

    useEffect(() => {
        if (success) dispatch(fetchAdminPostings({ criteria, pageable }));
    }, [success]);

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter.field) {
            setPageable((prev) => ({
                ...prev,
                sort: `${sorter.field},${sorter.order === 'ascend' ? 'asc' : 'desc'}`,
            }));
        }
    };

    const handleShowConfirm = ({ postingId, status }) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn?',
            content: 'Bạn có chắc chắn muốn cập nhật không?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                dispatch(updateStatus({ postingId, status }));
            },
        });
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
            render: (text, record) => <Link to={`/admin/dashboard/postings/${record.id}`}>{text}</Link>,
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
                    <Tag
                        color={
                            status === 'ACTIVATE'
                                ? 'green'
                                : status === 'PENDING'
                                ? 'orange'
                                : status === 'DEACTIVATE'
                                ? 'red'
                                : 'purple'
                        }
                    >
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
                        {status === 'PENDING' ? (
                            <>
                                <Button
                                    type="primary"
                                    icon={<FontAwesomeIcon icon={faCheck} />}
                                    onClick={() =>
                                        handleShowConfirm({
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
                                        handleShowConfirm({
                                            postingId: record.id,
                                            status: 'REJECTED',
                                        })
                                    }
                                >
                                    Từ chối
                                </Button>
                            </>
                        ) : (
                            <Button
                                href={`/admin/dashboard/postings/${record.id}`}
                                icon={<FontAwesomeIcon icon={faEye} />}
                            >
                                Xem chi tiết
                            </Button>
                        )}
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

export default Postings;
