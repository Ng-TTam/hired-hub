import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Modal, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchFilterCompanies, updateStatus } from '../../redux/companySlice';
import { formatDateTime } from '../../utils';
import Pagination from '../Pagination';
import styles from './CompanyManagement.module.scss';

const cx = classNames.bind(styles);

function CompanyManagement({ isActive = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { companies, totalPages, loading, success } = useSelector((state) => state.companies);

    const [criteria, setCriteria] = useState({ isActive });
    const [pageable, setPageable] = useState({ page: 0, size: 10 });

    useEffect(() => {
        dispatch(fetchFilterCompanies({ criteria, pageable }));
    }, [pageable]);

    useEffect(() => {
        if (success) {
            dispatch(fetchFilterCompanies({ criteria, pageable }));
        }
    }, [success]);

    const handleSearch = () => {
        setPageable((prev) => ({
            ...prev,
            page: 0,
        }));
    };

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter.field) {
            setPageable((prev) => ({
                ...prev,
                sort: `${sorter.field},${sorter.order === 'ascend' ? 'asc' : 'desc'}`,
            }));
        }
    };

    const handleShowConfirm = (companyId, status) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn?',
            content: 'Bạn có chắc chắn muốn cập nhật không?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                dispatch(updateStatus({ companyId, isActive: status }));
            },
        });
    };

    const columns = [
        {
            key: 'stt',
            title: 'STT',
            render: (text, record, index) => pageable.page * pageable.size + index + 1,
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên',
            render: (text, record) => <Link to={`/admin/dashboard/companies/${record.id}`}>{text}</Link>,
        },
        {
            key: 'taxCode',
            dataIndex: 'taxCode',
            title: 'Mã thuế',
        },
        {
            key: 'createAt',
            dataIndex: 'createdAt',
            title: 'Ngày tạo',
            sorter: true,
            render: (text, record) => formatDateTime(record.createdAt),
        },
        {
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: 'Cập nhật lần cuối',
            sorter: true,
            render: (text, record) => formatDateTime(record.updatedAt),
        },
        {
            key: 'isActive',
            dataIndex: 'isActive',
            title: 'Trạng thái',
            render: (text, record) => (
                <Tag color={record.isActive ? 'green' : 'orange'}>{record.isActive ? 'ACTIVATE' : 'PENDING'}</Tag>
            ),
        },
        {
            key: 'actions',
            title: 'Tác vụ',
            fixed: 'right',
            render: (text, record) => {
                return record.isActive ? (
                    <Button
                        variant="outlined"
                        icon={<FontAwesomeIcon icon={faEye} />}
                        onClick={() => navigate(`/admin/dashboard/companies/${record.id}`)}
                    >
                        Xem chi tiết
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faCheck} />}
                        onClick={() => handleShowConfirm(record.id, true)}
                    >
                        Phê duyệt
                    </Button>
                );
            },
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}>
                <Input
                    placeholder="Tên công ty"
                    value={criteria.name}
                    onChange={(e) => setCriteria((prev) => ({ ...prev, name: e.target.value }))}
                    onPressEnter={handleSearch}
                    allowClear
                    prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                />
                <Button type="primary" onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={companies}
                rowKey="id"
                onChange={handleTableChange}
                loading={loading}
                pagination={false}
            />
            <Pagination
                currentPage={pageable.page + 1}
                totalPages={totalPages}
                onPageChange={(newPage) => setPageable((prev) => ({ ...prev, page: newPage - 1 }))}
            />
        </div>
    );
}

export default CompanyManagement;
