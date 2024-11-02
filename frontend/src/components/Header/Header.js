// src/components/Header.js

import React from 'react';
import './Header.css';
import logo from './Header_logo.png';  // Add the logo file here

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Supply Chain Tracker Logo" className="logo" />
      <h1 className="title">Supply Chain Tracker</h1>
    </header>
  );
};

export default Header;
