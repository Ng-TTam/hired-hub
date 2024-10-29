import { useState } from 'react';
import { BarChart2, User, Package, Book, Lock, AlertCircle } from 'lucide-react';
import "./Sidebar.scss";

const Sidebar = () => {
  const [isTeamExpanded, setIsTeamExpanded] = useState(false);

  return (
    <div className="sidebar">
        <div className="logo">N.</div>

        <div className="team-section">
          <div className="team-info">
            <div className="team-icon"></div>
            <span className="team-name">Team 1</span>
            <span className="team-type">Free</span>
          </div>
          <button className="chevron-button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link active">
                <BarChart2 size={20} />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <User size={20} />
                <span>User</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <Package size={20} />
                <span>Product</span>
                <span className="badge">+3</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <Book size={20} />
                <span>Blog</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <Lock size={20} />
                <span>Sign in</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <AlertCircle size={20} />
                <span>Not found</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default Sidebar;