import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Settings,
  Search,
  User2,
  LucideInfo,
  LogOutIcon,
  Settings2,
  KeySquare,
  Circle,
} from "lucide-react";
import "./NavbarCMS.scss";

const NavbarCMS = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const popupRef = useRef(null);
  const notificationRef = useRef(null);

  const notifications = [
    "Thông báo 1",
    "Thông báo 2",
    "Thông báo 3",
    "Thông báo 4",
    "Thông báo 5",
    "Thông báo 6",
    "Thông báo 7",
    "Thông báo 8",
    "Thông báo 9",
    "Thông báo 10",
    "Thông báo 1",
    "Thông báo 2",
    "Thông báo 3",
    "Thông báo 4",
    "Thông báo 5",
    "Thông báo 6",
    "Thông báo 7",
    "Thông báo 8",
    "Thông báo 9",
    "Thông báo 10",
    "Thông báo 1",
    "Thông báo 2",
    "Thông báo 3",
    "Thông báo 4",
    "Thông báo 5",
    "Thông báo 6",
    "Thông báo 7",
    "Thông báo 8",
    "Thông báo 9",
    "Thông báo 10",
  ];

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
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input type="text" className="search-box" placeholder="Search" />
        </div>

        <div className="right-section">
          <button
            className={`icon-button notification-button ${
              isNotification ? "icon-button-active" : ""
            }`}
            onClick={toggleNotification}
          >
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <button
            className={`icon-button ${isOpen ? "icon-button-active" : ""}`}
            onClick={togglePopup}
          >
            <Settings size={20} />
          </button>
          <div className="avatar">
            <img src="/api/placeholder/36/36" alt="User avatar" />
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="user-menu-popup" ref={popupRef}>
          <ul>
            <li>
              <User2 size={20} /> &nbsp;&nbsp;&nbsp; Người dùng hệ thống
            </li>
            <li>
              <LucideInfo size={20} /> &nbsp;&nbsp;&nbsp; Thông tin của tôi
            </li>
            <li>
              <KeySquare size={20} /> &nbsp;&nbsp;&nbsp; Đổi mật khẩu
            </li>
            <li>
              <Settings2 size={20} /> &nbsp;&nbsp;&nbsp; Cài đặt hệ thống
            </li>
            <li>
              <LogOutIcon size={20} /> &nbsp;&nbsp;&nbsp; Đăng xuất
            </li>
          </ul>
        </div>
      )}

      {isNotification && (
        <div
          className="user-menu-popup notification-popup"
          ref={notificationRef}
        >
          <span style={{ fontSize: "20 px" }}>Thông báo</span>
          <span>
            <a className="notification-seen" href="#">
              Đã đọc
            </a>
          </span>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <Circle size={20} /> &nbsp;&nbsp;&nbsp; {notification}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarCMS;
