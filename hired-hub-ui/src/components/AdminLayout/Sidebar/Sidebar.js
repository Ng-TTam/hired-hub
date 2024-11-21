import { AppstoreAddOutlined, AppstoreOutlined, FileAddOutlined, FileTextOutlined } from '@ant-design/icons';
import {
    faArrowRightFromBracket,
    faBuilding,
    faBuildingShield,
    faGears,
    faUserGroup,
    faUserPlus,
    faUsers,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
    const menuItems = [
        {
            key: 'posts',
            icon: <AppstoreOutlined />,
            label: 'Quản lý bài viết',
            children: [
                {
                    key: 'new-posts',
                    icon: <FileAddOutlined />,
                    label: <Link to="/admin/dashboard/postings/pending">Bài viết mới</Link>,
                },
                {
                    key: 'all-posts',
                    icon: <FileTextOutlined />,
                    label: <Link to="/admin/dashboard/postings">Tất cả bài viết</Link>,
                },
            ],
        },
        {
            key: 'users',
            icon: <FontAwesomeIcon icon={faUsers} />,
            label: 'Quản lý người dùng',
            children: [
                {
                    key: 'new-empoyers',
                    icon: <FontAwesomeIcon icon={faUserPlus} />,
                    label: <Link to="/admin/dashboard/employers/pending">Nhà tuyển dụng mới</Link>,
                },
                {
                    key: 'employers',
                    icon: <FontAwesomeIcon icon={faUserTie} />,
                    label: <Link to="/admin/dashboard/employers">Nhà tuyển dụng</Link>,
                },
                {
                    key: 'all-job-seekers',
                    icon: <FontAwesomeIcon icon={faUserGroup} />,
                    label: <Link to="/admin/dashboard/users">Người tìm việc</Link>,
                },
            ],
        },
        {
            key: 'companies',
            icon: <FontAwesomeIcon icon={faBuilding} />,
            label: 'Quản lý doanh nghiệp',
            children: [
                {
                    key: 'new-companies',
                    icon: <AppstoreAddOutlined />,
                    label: <Link to="/admin/dashboard/companies/pending">Chờ duyệt</Link>,
                },
                {
                    key: 'all-companies',
                    icon: <FontAwesomeIcon icon={faBuildingShield} />,
                    label: <Link to="/admin/dashboard/companies">Danh sách công ty</Link>,
                },
            ],
        },
        {
            key: 'configs',
            icon: <FontAwesomeIcon icon={faGears} />,
            label: 'Cấu hình',
            children: [
                {
                    key: 'job-categories',
                    label: <Link to="/admin/dashboard/job-categories">Ngành nghề</Link>,
                },
                {
                    key: 'positions',
                    label: <Link to="/admin/dashboard/positions">Vị trí công việc</Link>,
                },
            ],
        },
        {
            key: 'logout',
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            label: <Link to="/logout">Đăng xuất</Link>,
        },
    ];

    return (
        <Sider width={250} style={{ height: '100vh', backgroundColor: 'var(--white-color)' }} collapsible>
            <Menu
                mode="inline"
                defaultSelectedKeys={['new-posts']}
                style={{ height: '100%', borderRight: 0 }}
                items={menuItems}
            />
        </Sider>
    );
};

export default Sidebar;
