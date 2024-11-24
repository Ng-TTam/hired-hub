import { KeySquare, LogOutIcon, LucideInfo, Search, Settings, User2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './NavbarCMS.scss';
import NotificationBadge from '../NotificationBadge';
import { Link } from 'react-router-dom';

const NavbarCMS = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const popupRef = useRef(null);
    const notificationRef = useRef(null);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const toggleNotification = () => {
        setIsNotification(!isNotification);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotification(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="navbar">
                {/* <div className="search-container">
                    <Search className="search-icon" size={20} />
                    <input type="text" className="search-box" placeholder="Search" />
                </div> */}

                <div className="right-section">
                    <NotificationBadge />
                    <button className={`icon-button ${isOpen ? 'icon-button-active' : ''}`} onClick={togglePopup}>
                        <Settings size={20} />
                    </button>
                    {/* <div className="avatar">
                        <img src="/api/placeholder/36/36" alt="User avatar" />
                    </div> */}
                </div>
            </nav>
            {isOpen && (
                <div className="user-menu-popup" ref={popupRef}>
                    <ul>
                        <li>
                            <User2 size={20} /> &nbsp;&nbsp;&nbsp; Cập nhật thông tin
                        </li>
                        <li>
                            <LucideInfo size={20} /> &nbsp;&nbsp;&nbsp; Thông tin của tôi
                        </li>
                        <li>
                            <KeySquare size={20} /> &nbsp;&nbsp;&nbsp; Đổi mật khẩu
                        </li>
                        <li>
                            <Link to="/logout">
                                <LogOutIcon size={20} /> &nbsp;&nbsp;&nbsp; Đăng xuất
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default NavbarCMS;
