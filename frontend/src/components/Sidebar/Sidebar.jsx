import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">Dashboard</li>
        <li className="sidebar-item">Scan Fraud</li>
        <li className="sidebar-item">Upload CSV</li>
        <li className="sidebar-item">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
