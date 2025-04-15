import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <h1 className="about-title">About CreditGuard</h1>
      <p className="about-subtitle">Your shield in a digital world of transactions.</p>
      <div className="about-card">
        <p>
          CreditGuard is a cutting-edge dashboard built to help analysts and financial professionals
          work with customer transactions, monitor account balances, and flag potentially fraudulent activity.
          Our mission is to bring security, simplicity, and efficiency to financial oversight.
        </p>
      </div>
    </div>
  );
}

export default About;
