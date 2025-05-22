import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navbar.css';
import DarkMode from "../DarkMode/DarkMode.jsx";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMenuOpen(false);
    }, [location.pathname]);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={isScrolled ? 'scrolled' : ''}>
            <div className="nav_brand">
                <span className="material-symbols-outlined">comedy_mask</span>
                <h1>Movie Tracker</h1>
            </div>

            <button
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            <div className={`nav_links ${isMenuOpen ? 'active' : ''}`}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Popular
                </NavLink>
                <NavLink
                    to="/top-rated"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Top Rated
                </NavLink>
                <NavLink
                    to="/upcoming"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Upcoming
                </NavLink>
            </div>

            <div className="nav_dark_mode">
                <DarkMode />
            </div>
        </nav>
    );
};

export default Navbar;