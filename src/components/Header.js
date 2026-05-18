// Header.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>Swiss Butter</Link>
          <button className="hamburger-menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav-menu ${isMenuOpen ? 'nav-open' : ''}`}>
            {/* Conditionally render the close button only when menu is open */}
            {isMenuOpen && (
              <button className="close-menu-btn-mobile" onClick={closeMenu}>&times;</button>
            )}
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Menu
            </Link>
            <Link
              to="/reservation"
              className={`nav-link ${location.pathname === '/reservation' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Reserve Table
            </Link>
            <Link
              to="/gallery"
              className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
