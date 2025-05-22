import React, { useEffect, useState } from "react";
import "./MovieList.css";
import Moviecard from "./Moviecard.jsx";
import FilterGroup from "./FilterGroup.jsx";

const MovieList = ({ type, title }) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [sortCategory, setSortCategory] = useState("popular");
    const [sortOrder, setSortOrder] = useState("ascending");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, [type]);

    useEffect(() => {
        filterAndSortMovies();
    }, [movies, minRating, maxRating, sortCategory, sortOrder]);

    const fetchMovies = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${type}?api_key=22c639cfa0e865169d6b5240e11530d8`
            );
            const data = await response.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (min, max) => {
        setMinRating(min);
        setMaxRating(max);
    };

    const handleSortCategoryChange = (event) => {
        setSortCategory(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filterAndSortMovies = () => {
        let updatedMovies = movies.filter(
            (movie) => movie.vote_average >= minRating && movie.vote_average < maxRating
        );

        updatedMovies.sort((a, b) => {
            let comparison = 0;
            switch (sortCategory) {
                case "newest":
                    comparison = new Date(a.release_date) - new Date(b.release_date);
                    break;
                case "rating":
                    comparison = a.vote_average - b.vote_average;
                    break;
                case "popular":
                default:
                    comparison = a.popularity - b.popularity;
                    break;
            }

            return sortOrder === "ascending" ? comparison : -comparison;
        });

        setFilteredMovies(updatedMovies);
    };

    return (
        <section className="movielist" id={type}>
            <header className="movie_list_header">
                <h2 className="movie_list_title">{title}</h2>

                <div className="movie_list_fs">
                    <FilterGroup minRating={minRating} onRatingClick={handleFilter} />

                    <select className="movie_sorting" onChange={handleSortCategoryChange} value={sortCategory}>
                        <option value="popular">Default</option>
                        <option value="newest">Date</option>
                        <option value="rating">Rating</option>
                    </select>

                    <select className="movie_sorting" onChange={handleSortOrderChange} value={sortOrder}>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
            </header>

            <div className="movie_cards">
                {loading ? (
                    <p>Loading movies...</p>
                ) : filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => <Moviecard key={movie.id} movie={movie} />)
                ) : (
                    <p>Nothing found in this category</p>
                )}
            </div>
        </section>
    );
};

export default MovieList;
