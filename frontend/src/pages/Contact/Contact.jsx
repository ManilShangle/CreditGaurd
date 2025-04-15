import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <h1 className="contact-title">Contact CreditGuard</h1>
      <p className="contact-subtitle">Have questions or feedback? We’re here to help.</p>
      <div className="contact-card">
        <h3>Email</h3>
        <p>support@creditguard.com</p>
      </div>
      <div className="contact-card">
        <h3>Phone</h3>
        <p>+1 (800) 555-0199</p>
      </div>
      <div className="contact-card">
        <h3>Address</h3>
        <p>123 Security Lane, Fintech City, TX 75001</p>
      </div>
    </div>
  );
}

export default Contact;
