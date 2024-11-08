// src/components/Header.js

import React from 'react';
import './Header.css';
import logo from './Header_logo.png';  // Add the logo file here

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Supply Chain Tracker Logo" className="logo" />
      <div className="title">Supply Chain Tracker</div>
    </div>
  );
};

export default Header;
