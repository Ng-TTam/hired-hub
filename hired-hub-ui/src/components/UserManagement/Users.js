import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Space, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../redux/accountSlice';
import { fetchAllUsers } from '../../redux/userSlice';
import { formatDateTime } from '../../utils';
import Pagination from '../Pagination';
import Filter from './Filter';
import styles from './UserManagement.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Users = () => {
    const dispatch = useDispatch();
    const { users, totalPages, loading } = useSelector((state) => state.user);
    const { updateSuccess } = useSelector((state) => state.account);

    const [criteria, setCriteria] = useState({ role: 'JOB_SEEKER' });
    const [pageable, setPageable] = useState({ page: 0, size: 10 });

    useEffect(() => {
        dispatch(fetchAllUsers({ criteria, pageable }));
    }, [dispatch]);

    useEffect(() => {
        if (updateSuccess) {
            dispatch(fetchAllUsers({ criteria, pageable }));
        }
    }, [updateSuccess]);

    const handleOnSearchValueChange = (newEmail) => {
        setCriteria((prev) => ({
            ...prev,
            email: newEmail,
        }));
    };

    const handleOnStatusChange = (newStatus) => {
        setCriteria((prev) => ({
            ...prev,
            status: newStatus,
        }));
    };

    const handleShowConfirm = ({ accountId, status }) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn?',
            content:
                status === 'DEACTIVATE'
                    ? 'Hành động này sẽ khiến người dùng không thể tiếp tục truy cập vào tài khoản của mình. Bạn có muốn tiếp tục không?'
                    : 'Bạn có chắc chắn muốn cập nhật không?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                dispatch(updateStatus({ accountId, status }));
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
            title: 'Email',
            dataIndex: ['account', 'email'],
            key: 'email',
            render: (text, record) => <Link to={`/admin/dashboard/users/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (text, record) => {
                const status = record.account.status;
                return (
                    <Tag color={status === 'ACTIVATE' ? 'green' : status === 'PENDING' ? 'orange' : 'red'}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Ngày tạo',
            key: 'createdAt',
            render: (text, record) => formatDateTime(record.account.createdAt),
            sorter: true,
        },
        {
            title: 'Cập nhật lần cuối',
            key: 'updatedAt',
            render: (text, record) => formatDateTime(record.account.updatedAt),
            sorter: true,
        },
        {
            title: 'Tác vụ',
            key: 'actions',
            fixed: 'right',
            render: (text, record) => {
                const status = record.account.status;
                return (
                    <Space>
                        {status === 'ACTIVATE' ? (
                            <Button
                                danger
                                icon={<FontAwesomeIcon icon={faLock} />}
                                onClick={() =>
                                    handleShowConfirm({ accountId: record.account.id, status: 'DEACTIVATE' })
                                }
                            >
                                Khóa
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                icon={<FontAwesomeIcon icon={faUnlock} />}
                                onClick={() => handleShowConfirm({ accountId: record.account.id, status: 'ACTIVATE' })}
                            >
                                Mở khóa
                            </Button>
                        )}
                    </Space>
                );
            },
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <Filter
                criteria={criteria}
                filterStatus
                onEmailChange={handleOnSearchValueChange}
                onSelectedStatusChange={handleOnStatusChange}
                onClickSearch={() => dispatch(fetchAllUsers({ criteria, pageable }))}
            />
            <Table columns={columns} dataSource={users} rowKey="id" loading={loading} pagination={false} />
            <Pagination
                currentPage={pageable.page + 1}
                totalPages={totalPages}
                onPageChange={(page) => setPageable((prev) => ({ ...prev, page: page - 1 }))}
            />
        </div>
    );
};

export default Users;
