import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar({ userName, handleLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          &#9776;
        </button>
      </div>
      <ul className={isMobileMenuOpen ? 'open' : ''}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }} onClick={closeMobileMenu}>Home</Link>
        </li>
        <li>
          <Link to="/folders" style={{ textDecoration: 'none', color: 'black' }} onClick={closeMobileMenu}>Folders</Link>
        </li>
        <li>
          <Link to="/add-folder" style={{ textDecoration: 'none', color: 'black' }} onClick={closeMobileMenu}>Add Folder</Link>
        </li>
        <li>
          <Link to="/set-home-photo" style={{ textDecoration: 'none', color: 'black' }} onClick={closeMobileMenu}>Set Home Photo</Link>
        </li>
        <li>
          <Link to="/calendar" style={{ textDecoration: 'none', color: 'black' }} onClick={closeMobileMenu}>Calendar</Link>
        </li>
        <li>
          <Link to="/chat" style={{ textDecoration: 'none', color: 'black' }} onClick={closeMobileMenu}>Chat</Link>
        </li>
        <li>
          <button onClick={() => { handleLogout(); closeMobileMenu(); }} style={{ textDecoration: 'none', color: 'black', background: 'none', border: 'none', cursor: 'pointer' }}>
            {userName ? `Log Out of ${userName}` : 'Log Out'}
          </button>
        </li>
      </ul>
    </nav>
  );
}