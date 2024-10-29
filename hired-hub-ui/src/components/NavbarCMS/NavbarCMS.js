import React, { useState } from 'react';
import { Bell, Settings, Search, SlidersHorizontal } from 'lucide-react';
import "./NavbarCMS.scss";

const NavbarCMS = () => {
  return (
    <>
      <nav className="navbar">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-box" 
            placeholder="Search"
          />
          <button className="filter-button">
            <SlidersHorizontal size={16} />
          </button>
        </div>

        <div className="right-section">
          <button className="icon-button notification-button">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          
          <div className="avatar">
            <img src="/api/placeholder/36/36" alt="User avatar" />
          </div>
          
          <button className="icon-button">
            <Settings size={20} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavbarCMS;