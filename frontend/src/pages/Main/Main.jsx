import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const [fraudStatus, setFraudStatus] = useState(null);

  useEffect(() => {
    const status = localStorage.getItem('fraudStatus');
    if (status === 'Yes' || status === 'No') {
      setFraudStatus(status);
    } else {
      setFraudStatus(null);
    }
  }, []);

  return (
    <main className="main">
      <h1 className="main-title">Welcome to CreditGuard</h1>
      <p className="main-subtitle">
        Your intelligent dashboard for monitoring and detecting suspicious credit card activities.
      </p>
      
      <Link to='/dashboard' className="card-link">
        <div className="main-card">
          <h2>Fraud Detection Overview</h2>
          {fraudStatus === 'Yes' && (
            <p>Current Status: <strong style={{ color: '#ff4d4f' }}>Fraud Detected</strong></p>
          )}
          {fraudStatus === 'No' && (
            <p>Current Status: <strong style={{ color: '#4f83ff' }}>All Clear</strong></p>
          )}
          {fraudStatus === null && (
            <p>Status: <strong style={{ color: '#dcdde1' }}>Not Available</strong></p>
          )}
        </div>
      </Link>
    </main>
  );
};

export default Main;
