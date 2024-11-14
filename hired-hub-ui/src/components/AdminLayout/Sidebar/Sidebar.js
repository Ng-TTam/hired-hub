import { AppstoreOutlined, FileAddOutlined, FileTextOutlined } from '@ant-design/icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';

const { Sider } = Layout;

const Sidebar = () => {
    return (
        <Sider width={250} style={{ height: '100vh', backgroundColor: 'var(--white-color)' }} collapsible>
            <UserCard />
            <Menu mode="inline" defaultSelectedKeys={['new-post']} style={{ height: '100%', borderRight: 0 }}>
                <Menu.SubMenu key="posts" title="Quản lý bài viết" icon={<AppstoreOutlined />}>
                    <Menu.Item key="new-post" icon={<FileAddOutlined />}>
                        <Link to={'/admin/dashboard/postings/pending'}>Bài viết mới</Link>
                    </Menu.Item>
                    <Menu.Item key="all-posts" icon={<FileTextOutlined />}>
                        <Link to={'/admin/dashboard/postings'}>Tất cả bài viết</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}>
                    <Link to={'/logout'}>Đăng xuất</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
