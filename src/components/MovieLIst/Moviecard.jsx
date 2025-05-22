import React from 'react';
import PropTypes from 'prop-types';
import './Moviecard.css';

const Moviecard = ({ movie }) => {
    const movieLink = `https://www.themoviedb.org/movie/${movie.id}`; // Movie detail URL

    return (
        <a href={movieLink} className="movie_card" target="_blank" rel="noopener noreferrer">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                className="movie_poster"
            />

            <div className="movie_detail">
                <h2 className="movie_title">{movie.original_title}</h2>
                <div className="movie_date_rate">
                    <p>{movie.release_date}</p>
                    <p className="movie_rating">
                        <span className="material-symbols-outlined star_icon">star</span>
                        {movie.vote_average}
                    </p>
                </div>
                <p className="movie_description">
                    {movie.overview}
                </p>
            </div>
        </a>
    );
};

// ✅ Correct PropTypes definition
Moviecard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        original_title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number,
        overview: PropTypes.string
    }).isRequired
};

export default Moviecard;
