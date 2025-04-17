import React from 'react';
import './Header.css';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="left">
        <FaBars className="hamburger" onClick={toggleSidebar} />
        <div className="logo"><Link to="/">CreditGuard</Link></div>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
