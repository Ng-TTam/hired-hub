import { Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './FilterPosting.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const StatusOptions = Object.freeze([
    {
        value: 'ACTIVATE',
        label: 'ACTIVATE',
    },
    {
        value: 'DEACTIVATE',
        label: 'DEACTIVATE',
    },
    {
        value: 'PENDING',
        label: 'PENDING',
    },
    {
        value: 'REJECTED',
        label: 'REJECTED',
    },
]);

function FilterPosting({ criteria, onSearchValueChange, onSelectedStatusChange, filterStatus = false, onClickSearch, className }) {
    const [searchValue, setSearchValue] = useState(criteria?.searchValue || '');
    const [status, setStatus] = useState(criteria?.status || '');

    // Đồng bộ hóa state khi props `criteria` thay đổi
    useEffect(() => {
        if (criteria?.searchValue !== undefined) {
            setSearchValue(criteria.searchValue);
        }
        if (criteria?.status !== undefined) {
            setStatus(criteria.status);
        }
    }, [criteria]);

    const handleSearchChange = (value) => {
        setSearchValue(value);
        if (onSearchValueChange) {
            onSearchValueChange(value);
        }
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        if (onSelectedStatusChange) {
            onSelectedStatusChange(value);
        }
    };

    return (
        <div className={cx('wrapper', className)}>
            <Input
                className={cx('search-text')}
                placeholder="Nhập tiêu đề..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                allowClear
            />
            {filterStatus && (
                <Select
                    className={cx('select-status')}
                    placeholder="Trạng thái..."
                    value={status}
                    options={StatusOptions}
                    onChange={handleStatusChange}
                    allowClear
                />
            )}
            <Button type="primary" icon={<SearchOutlined />} onClick={onClickSearch}>
                Tìm kiếm
            </Button>
            <Link to="/business/create-post">
                <Button type="primary">Đăng tuyển</Button>
            </Link>
        </div>
    );
}

export default FilterPosting;
