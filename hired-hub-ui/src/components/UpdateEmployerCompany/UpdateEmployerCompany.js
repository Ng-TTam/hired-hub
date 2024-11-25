import { faCircleCheck, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByCurrentUserLogin } from '../../redux/companySlice';
import CreateCompanyForm from '../CreateCompanyForm/CreateCompanyForm';
import CompanyList from './CompanyList';
import EmployerCompany from './EmployerCompany';
import styles from './UpdateEmployerCompany.module.scss';

const cx = classNames.bind(styles);

function UpdateEmployerCompany() {
    const dispatch = useDispatch();
    const { company } = useSelector((state) => state.companies);
    const { success } = useSelector((state) => state.employer);

    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
        dispatch(fetchByCurrentUserLogin());
    }, []);

    useEffect(() => {
        if (success) {
            dispatch(fetchByCurrentUserLogin());
        }
    }, [success]);

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const renderTabHeader = (icon, title, subtitle, key) => (
        <div className={cx('tab-header__wrapper')}>
            <FontAwesomeIcon icon={icon} />
            <div className={cx('tab-header__title')}>
                <span>{title}</span>
                <span>{subtitle}</span>
            </div>
            <FontAwesomeIcon icon={faCircleCheck} className={cx('active-icon', { visible: key === activeTab })} />
        </div>
    );

    const tabItems = [
        {
            key: '1',
            label: renderTabHeader(
                faMagnifyingGlass,
                'Tìm kiếm thông tin công ty',
                'Dành cho doanh nghiệp đã có trên HiredHub',
                '1',
            ),
            children: <CompanyList />,
        },
        {
            key: '2',
            label: renderTabHeader(
                faCirclePlus,
                'Tạo công ty mới',
                'Dành cho doanh nghiệp lần đầu sử dụng HiredHub',
                '2',
            ),
            children: <CreateCompanyForm />,
        },
    ];

    if (company) {
        return <EmployerCompany company={company} />;
    }

    return (
        <Tabs
            className={cx('wrapper')}
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={handleTabChange}
            items={tabItems}
        />
    );
}

export default UpdateEmployerCompany;
