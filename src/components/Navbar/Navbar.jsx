import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './navbar.css';
import DarkMode from "../DarkMode/DarkMode.jsx";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(
        location.pathname === '/search' ? searchParams.get('q') || '' : ''
    );

    useEffect(() => {
        if (location.pathname === '/search') {
            setSearchQuery(searchParams.get('q') || '');
        } else {
            setSearchQuery('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        const trimmedQuery = searchQuery.trim();

        if (!trimmedQuery) {
            // Clear results immediately when the search box is emptied.
            if (location.pathname === '/search' && searchParams.get('q')) {
                navigate('/search', { replace: true });
            }
            return;
        }

        const timer = setTimeout(() => {
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`, { replace: true });
        }, 400);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        }
    };

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

            <form className="nav_search" role="search" onSubmit={handleSearchSubmit}>
                <label htmlFor="movie-search" className="sr-only">
                    Search movies
                </label>
                <input
                    id="movie-search"
                    type="search"
                    className="nav_search_input"
                    placeholder="Search movies..."
                    aria-label="Search movies"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="nav_search_button" aria-label="Search">
                    <span className="material-symbols-outlined">search</span>
                </button>
            </form>

            <div className="nav_dark_mode">
                <DarkMode />
            </div>
        </nav>
    );
};

export default Navbar;