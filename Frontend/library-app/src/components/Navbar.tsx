import React, { useState, FC } from 'react';
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import '../components/Navbar.css';

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          Library Management System
        </Link>

        <button onClick={toggleMenu} className="navbar-button">
          <FaBars className="text-2xl" />
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'navbar-mobile-menu open' : ''}`}>
          <Link to="/listing_page" className="navbar-link">
            <span>Add New Book</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-mobile-menu open">
          <div className="navbar-links">
            <Link to="/listing_page" className="navbar-link">
              <span>Add New Book</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
