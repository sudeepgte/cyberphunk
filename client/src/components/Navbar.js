import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close nav on route change
  useEffect(() => { setNavOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/community', label: 'Community' },
  ];

  return (
    <nav className={`navbar navbar-expand-lg ag-navbar fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand ag-brand">
          CYBER<span>PHUNK</span>
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {navLinks.map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <Link
                  to={path}
                  className={`nav-link ag-nav-link ${isActive(path)}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link to="/community" className="btn-neon btn-neon-secondary" style={{ padding: '8px 22px', fontSize: '0.85rem' }}>
                <i className="bi bi-discord"></i> Join Discord
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
