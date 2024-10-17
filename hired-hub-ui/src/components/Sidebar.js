import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>AdminLTE 3</h3>
      </div>
      <div className="profile">
        <img src="profile-pic-url" alt="User Profile" />
        <h4>Alexander Pierce</h4>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard-v3">Dashboard v3</Link></li>
        <li><Link to="/dashboard-v1">Dashboard v1</Link></li>
        <li><Link to="/dashboard-v2">Dashboard v2</Link></li>
        <li className="menu-item-has-children">
          <Link to="#">Widgets <span className="badge">New</span></Link>
          {/* Add more menu items as needed */}
        </li>
        <li className="menu-item">
          <Link to="/calendar">Calendar</Link>
        </li>
        {/* Add more sidebar items here */}
      </ul>
    </div>
  );
};

export default Sidebar;
