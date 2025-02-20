import { AppstoreAddOutlined, AppstoreOutlined, FileAddOutlined, FileTextOutlined } from '@ant-design/icons';
import {
    faArrowRightFromBracket,
    faBuilding,
    faBuildingShield,
    faGears,
    faHouse,
    faUserGroup,
    faUserPlus,
    faUsers,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Menu } from 'antd';
import { LayoutDashboard } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState(() => {
        return sessionStorage.getItem('sidebarSelectedKeys')
            ? JSON.parse(sessionStorage.getItem('sidebarSelectedKeys'))
            : [];
    });

    const [openKeys, setOpenKeys] = useState(() => {
        return sessionStorage.getItem('sidebarOpenKeys') ? JSON.parse(sessionStorage.getItem('sidebarOpenKeys')) : [];
    });

    const menuItems = [
        {
            key: 'dashboard',
            icon: <FontAwesomeIcon icon={faHouse} />,
            label: <Link to="/admin/dashboard">Trang chủ</Link>,
        },
        {
            key: 'posts',
            icon: <AppstoreOutlined />,
            label: 'Quản lý bài viết',
            children: [
                {
                    key: 'new-posts',
                    icon: <FileAddOutlined />,
                    label: <Link to="/admin/postings/pending">Bài viết mới</Link>,
                },
                {
                    key: 'all-posts',
                    icon: <FileTextOutlined />,
                    label: <Link to="/admin/postings">Tất cả bài viết</Link>,
                },
            ],
        },
        {
            key: 'users',
            icon: <FontAwesomeIcon icon={faUsers} />,
            label: 'Quản lý người dùng',
            children: [
                {
                    key: 'new-employers',
                    icon: <FontAwesomeIcon icon={faUserPlus} />,
                    label: <Link to="/admin/employers/pending">Nhà tuyển dụng mới</Link>,
                },
                {
                    key: 'employers',
                    icon: <FontAwesomeIcon icon={faUserTie} />,
                    label: <Link to="/admin/employers">Nhà tuyển dụng</Link>,
                },
                {
                    key: 'all-job-seekers',
                    icon: <FontAwesomeIcon icon={faUserGroup} />,
                    label: <Link to="/admin/users">Người tìm việc</Link>,
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
                    label: <Link to="/admin/companies/pending">Chờ duyệt</Link>,
                },
                {
                    key: 'all-companies',
                    icon: <FontAwesomeIcon icon={faBuildingShield} />,
                    label: <Link to="/admin/companies">Danh sách công ty</Link>,
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
                    label: <Link to="/admin/job-categories">Ngành nghề</Link>,
                },
                {
                    key: 'positions',
                    label: <Link to="/admin/positions">Vị trí công việc</Link>,
                },
            ],
        },
        {
            key: 'logout',
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            label: <Link to="/logout">Đăng xuất</Link>,
        },
    ];

    useEffect(() => {
        const matchedKey = menuItems
            .flatMap((item) => (item.children ? item.children.map((child) => child.key) : [item.key]))
            .find((key) => location.pathname.includes(key));

        if (matchedKey) {
            setSelectedKeys([matchedKey]);

            const parentMenu = menuItems.find(
                (item) => item.children && item.children.some((child) => child.key === matchedKey),
            );

            if (parentMenu) {
                setOpenKeys([parentMenu.key]);
            }
        }
    }, [location.pathname]);

    const handleSelect = ({ key }) => {
        setSelectedKeys([key]);
        sessionStorage.setItem('sidebarSelectedKeys', JSON.stringify([key]));
    };

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
        sessionStorage.setItem('sidebarOpenKeys', JSON.stringify(keys));
    };

    return (
        <Sider width={250} style={{ height: '100vh', backgroundColor: 'var(--white-color)' }} collapsible>
            <Menu
                mode="inline"
                defaultSelectedKeys={selectedKeys}
                defaultOpenKeys={openKeys}
                onSelect={handleSelect}
                onOpenChange={handleOpenChange}
                style={{ height: '100%', borderRight: 0 }}
                items={menuItems}
            />
        </Sider>
    );
};

export default Sidebar;
