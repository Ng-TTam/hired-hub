import { Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

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
]);

function Filter({ criteria, onEmailChange, onSelectedStatusChange, filterStatus = false, onClickSearch, className }) {
    const [email, setEmail] = useState(criteria?.email);
    const [status, setStatus] = useState(criteria?.status);

    return (
        <div className={cx('wrapper', className)}>
            <Input
                className={cx('search-text')}
                placeholder="Nhập email..."
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                allowClear
            />
            {filterStatus && (
                <Select
                    className={cx('select-status')}
                    placeholder="Trạng thái..."
                    value={status}
                    options={StatusOptions}
                    onChange={onSelectedStatusChange}
                    allowClear
                />
            )}
            <Button type="primary" icon={<SearchOutlined />} onClick={onClickSearch}>
                Tìm kiếm
            </Button>
        </div>
    );
}

export default Filter;
