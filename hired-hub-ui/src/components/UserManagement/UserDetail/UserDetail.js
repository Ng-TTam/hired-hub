import { faCheck, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Card, Descriptions, Modal, Space, Tag, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import images from '../../../assets/images';
import { updateStatus } from '../../../redux/accountSlice';
import { fetchUserById } from '../../../redux/userSlice';
import { formatDate, formatDateTime } from '../../../utils';

const UserDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { entity: user, loading } = useSelector((state) => state.user);
    const { updateSuccess } = useSelector((state) => state.account);

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (updateSuccess) {
            dispatch(fetchUserById(id));
        }
    }, [updateSuccess]);

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

    return (
        <Card loading={loading}>
            <Descriptions column={1} bordered>
                <Descriptions.Item label="Avatar">
                    <Avatar
                        src={user?.avatar}
                        icon={<img src={images.cvAvatarDefault} alt="default-avatar" />}
                        size={100}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="Họ tên">
                    {user?.firstName} {user?.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Email">{user?.account.email}</Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">{formatDate(user?.dob)}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{user?.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">{user?.address}</Descriptions.Item>
                <Descriptions.Item label="Giới tính">{user?.gender}</Descriptions.Item>
                <Descriptions.Item label="Role">{user?.account.role}</Descriptions.Item>

                {user?.account?.role === 'EMPLOYER' && (
                    <Descriptions.Item label="Công ty">
                        {user?.company ? (
                            <Space>
                                <Link to={`/admin/dashboard/companies/${user?.company?.id}`}>{user?.company.name}</Link>
                                <Tag color={user?.company?.isActive ? 'green' : 'orange'}>
                                    {user?.company?.isActive ? 'ACTIVATE' : 'PENDING'}
                                </Tag>
                            </Space>
                        ) : (
                            <Tag color="red">Chưa cập nhật</Tag>
                        )}
                    </Descriptions.Item>
                )}

                <Descriptions.Item label="Trạng thái">
                    <Tag
                        color={
                            user?.account.status === 'ACTIVATE'
                                ? 'green'
                                : user?.account.status === 'PENDING'
                                ? 'orange'
                                : 'red'
                        }
                    >
                        {user?.account.status}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">{formatDateTime(user?.account.createdAt)}</Descriptions.Item>
                <Descriptions.Item label="Cập nhật lần cuối">
                    {formatDateTime(user?.account.updatedAt)}
                </Descriptions.Item>
                <Descriptions.Item label="Tác vụ">
                    {user?.account?.role === 'EMPLOYER' && user?.account?.status === 'PENDING' ? (
                        <Tooltip title={!user?.company?.isActive ? 'Cần phê duyệt công ty trước' : ''} placement="top">
                            <Button
                                type="primary"
                                icon={<FontAwesomeIcon icon={faCheck} />}
                                onClick={() => handleShowConfirm({ accountId: user.account.id, status: 'ACTIVATE' })}
                                disabled={!user?.company?.isActive}
                            >
                                Phê duyệt
                            </Button>
                        </Tooltip>
                    ) : user?.account.status === 'ACTIVATE' ? (
                        <Button
                            danger
                            icon={<FontAwesomeIcon icon={faLock} />}
                            onClick={() => handleShowConfirm({ accountId: user.account.id, status: 'DEACTIVATE' })}
                        >
                            Khóa
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faUnlock} />}
                            onClick={() => handleShowConfirm({ accountId: user.account.id, status: 'ACTIVATE' })}
                        >
                            Mở khóa
                        </Button>
                    )}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default UserDetail;
