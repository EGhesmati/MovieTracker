import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './app.css';
import './index.css';
import Navbar from './components/Navbar/Navbar.jsx';
import MovieList from './components/MovieLIst/MovieList.jsx';
import Footer from './components/Footer/Footer.jsx';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app">
            <Navbar />
            <main>
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <TransitionGroup className="transition-group">
                        <CSSTransition
                            key={window.location.pathname}
                            classNames="page"
                            timeout={500}
                        >
                            <div className="page-container">
                                <Routes>
                                    <Route path="/" element={<MovieList type="popular" title="Popular" />} />
                                    <Route path="/top-rated" element={<MovieList type="top_rated" title="Top Rated" />} />
                                    <Route path="/upcoming" element={<MovieList type="upcoming" title="Upcoming" />} />
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;

