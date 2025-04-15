import React from 'react';
import './Header.css';
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="left">
        <FaBars className="hamburger" onClick={toggleSidebar} />
        <div className="logo">CreditGuard</div>
      </div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
