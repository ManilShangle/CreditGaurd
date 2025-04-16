import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <Link to="/dashboard" className="sidebar-link">
          <li className="sidebar-item">Dashboard</li>
        </Link>
        <Link to="/upload" className="sidebar-link">
          <li className="sidebar-item">Upload CSV</li>
        </Link>
        <li className="sidebar-item">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
