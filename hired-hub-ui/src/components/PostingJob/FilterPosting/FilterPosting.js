import { Button, Input, Select, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './FilterPosting.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    const user = useSelector(state => state.user.user);

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
            <Tooltip title = {user?.account?.status !== "ACTIVATE"? "Cần xác thực tài khoản trước khi đăng tuyển" : "Đăng tuyển"}>
                <Link to="/business/create-post">
                    <Button disabled={user?.account?.status !== "ACTIVATE"} type="primary">Đăng tuyển</Button>
                </Link>
            </Tooltip>
        </div>
    );
}

export default FilterPosting;
