import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} MovieTracker</p>
            <p>Made with ❤️ by Erfan Ghesmati</p>
        </footer>
    );
};

export default Footer;