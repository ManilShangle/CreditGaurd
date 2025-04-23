import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
  return (
    <main className="main">
      <h1 className="main-title">Welcome to CreditGuard</h1>
      <p className="main-subtitle">
        Your intelligent dashboard for monitoring credit card activity and preventing fraud.
      </p>
      <Link to='/dashboard'>
        <div className="card">
          <h2>Real-Time Transaction Feed</h2>
          <p>Coming soon: View your latest transactions and get instant alerts for suspicious activity.</p>
        </div>
      </Link>
    </main>
  );
};

export default Main;


