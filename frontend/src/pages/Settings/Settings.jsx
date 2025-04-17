import React, { useState } from 'react';
import './Settings.css';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    // You could store this in localStorage or call backend here
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>

      <div className="settings-card">
        <h3 className="section-title">Preferences</h3>

        <div className="setting-item">
          <label>Dark Mode</label>
          <button className="toggle-btn" onClick={handleThemeToggle}>
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>

        <div className="setting-item">
          <label>Email Notifications</label>
          <button className="toggle-btn" onClick={handleNotificationsToggle}>
            {notifications ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <p className="settings-note">
          (These settings are currently stored only for this session.)
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
