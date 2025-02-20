import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, ChartBarIcon, LogOut, LibraryBig } from 'lucide-react';
import './Sidebar.scss';
import images from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../Image';
import { fetchUserInformation } from '../../redux/userSlice';

const Sidebar = () => {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserInformation());
    }, dispatch)

    return (
        <div className="sidebar">
            <div className="logo-app">
                <img src={images.hiredHubLogoNoPadding} alt="Logo" />
            </div>

            <div className="user-section">
                <div className="user-info">
                    <div className="user-icon" >
                        <Image className='user-icon-avatar'
                        src={user?.avatar? user?.avatar : images.avatarDefault}
                        alt="User avatar"
                        fallback={ images.avatarDefault}
                        style={{maxWidth: "100%", maxHeight: "100%", aspectRatio: "1 / 1", objectFit:"cover",borderRadius: "50%" , marginLeft:"auto" , marginRight:"auto"}}
                        />
                    </div>
                    <span className="user-name">
                        Hi {user?.lastName}
                    </span>
                </div>
            </div>

            <nav>
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink
                            to="/business/dashboard"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <LayoutDashboard size={20} />
                            <span>Bảng tin</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/business/posting-job"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <LibraryBig size={20} />
                            <span>Tin tuyển dụng</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/business/manage-candidate"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <User size={20} />
                            <span>Quản lý ứng viên</span>
                        </NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink
                            to="/business/posting-stat"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <ChartBarIcon size={20} />
                            <span>Báo cáo tuyển dụng</span>
                        </NavLink>
                    </li> */}
                    <li className="nav-item">
                        <NavLink to="/logout" className="nav-link">
                            <LogOut size={20} />
                            <span>Đăng xuất</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
