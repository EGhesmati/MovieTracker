import React from 'react';

const FilterGroup = ({ minRating, onRatingClick }) => {
    return (
        <ul className="movie_filter">
            <li
                className={`movie_filter_item ${minRating === 0 ? "active" : ""}`}
                onClick={() => onRatingClick(0, 10)}
            >
                All
            </li>
            <li
                className={`movie_filter_item ${minRating === 7 ? "active" : ""}`}
                onClick={() => onRatingClick(7, 8)}
            >
                7 + star
            </li>
            <li
                className={`movie_filter_item ${minRating === 6 ? "active" : ""}`}
                onClick={() => onRatingClick(6, 7)}
            >
                6 + star
            </li>
            <li
                className={`movie_filter_item ${minRating === 5 ? "active" : ""}`}
                onClick={() => onRatingClick(5, 6)}
            >
                5 + star
            </li>
        </ul>
    );
};

export default FilterGroup;
