import { useState } from "react";
import {
  LayoutDashboard,
  User,
  Package,
  ChartBarIcon,
  LogOut,
  LibraryBig,
} from "lucide-react";
import "./Sidebar.scss";

const Sidebar = ({ onSelectItem, selectedItem }) => {
  return (
    <div className="sidebar">
      <div className="logo-app">Hired hub</div>

      <div className="user-section">
        <div className="user-info">
          <div className="user-icon" />
          <span className="user-name">Xin chào User</span>
          {/* <span className="user-type">Free</span> */}
        </div>
      </div>

      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <a
              href="#"
              // className="nav-link active"
              className={`nav-link ${
                selectedItem === "dashboard" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("dashboard");
              }}
            >
              <LayoutDashboard size={20} />
              <span>Bảng tin</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${
                selectedItem === "PostingJob" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("PostingJob");
              }}
            >
              <LibraryBig size={20} />
              <span>Tin tuyển dụng</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${
                selectedItem === "ManageCandidate" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("ManageCandidate");
              }}
            >
              <User size={20} />
              <span>Quản lý ứng viên</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${
                selectedItem === "PostingStat" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("PostingStat");
              }}
            >
              <ChartBarIcon size={20} />
              <span>Báo cáo tuyển dụng</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${
                selectedItem === "Notification" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                onSelectItem("Notification");
              }}
            >
              <Package size={20} />
              <span>Thông báo</span>
              <span className="badge">+8</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
