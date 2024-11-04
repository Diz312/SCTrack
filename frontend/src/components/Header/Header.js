// src/components/Header.js

import React from 'react';
import './Header.css';
import logo from './Header_logo.png';  // Add the logo file here

const Header = () => {
  return (
    <header className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      <img src={logo} alt="Supply Chain Tracker Logo" className="logo" style={{ marginRight: '10px' }} />
      <h1 className="title" style={{ margin: 0 }}>Supply Chain Tracker</h1>
    </header>
  );
};

export default Header;
