import React, { useState, useEffect } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check localStorage for saved theme on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("dark-mode");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "true");
        }
    }, []);

    // Update the body class and save preference to localStorage
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "true");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "false");
        }
    }, [isDarkMode]);

    const handleClick = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <div className="dark_mode">
            <button className={`dark_mode_button ${isDarkMode ? 'dark' : 'light'}`} onClick={handleClick}>
                {/* Sun icon for light mode and Moon icon for dark mode */}
                {isDarkMode ? (
                    <Moon size={24} color="#FF758F" />
                ) : (
                    <Sun size={24} color="#09122C" />
                )}
            </button>
        </div>
    );
};

export default DarkMode;
