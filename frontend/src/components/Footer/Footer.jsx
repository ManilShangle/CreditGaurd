import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} CreditGuard. All rights reserved.
    </footer>
  );
};

export default Footer;
