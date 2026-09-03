import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./MovieList.css";
import Moviecard from "./Moviecard.jsx";
import FilterGroup from "./FilterGroup.jsx";

const TMDB_API_KEY = "22c639cfa0e865169d6b5240e11530d8";

const MovieList = ({ type, title }) => {
    const [searchParams] = useSearchParams();
    const query = type === "search" ? (searchParams.get("q") || "").trim() : null;

    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [sortCategory, setSortCategory] = useState("popular");
    const [sortOrder, setSortOrder] = useState("ascending");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        fetchMovies(controller.signal);
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, query]);

    useEffect(() => {
        filterAndSortMovies();
    }, [movies, minRating, maxRating, sortCategory, sortOrder]);

    const fetchMovies = async (signal) => {
        if (type === "search" && !query) {
            setMovies([]);
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const endpoint =
                type === "search"
                    ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
                    : `https://api.themoviedb.org/3/movie/${type}?api_key=${TMDB_API_KEY}`;

            const response = await fetch(endpoint, { signal });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            setMovies(data.results || []);
        } catch (err) {
            if (err.name === "AbortError") return;
            console.error("Failed to fetch movies:", err);
            setError("Something went wrong while fetching movies. Please try again.");
            setMovies([]);
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
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

    const isSearch = type === "search";
    const headerTitle = isSearch
        ? query
            ? `Search results for "${query}"`
            : "Search"
        : title;

    const renderContent = () => {
        if (loading) {
            return <p>Loading movies...</p>;
        }
        if (error) {
            return <p className="movie_list_message">{error}</p>;
        }
        if (isSearch && !query) {
            return <p className="movie_list_message">Type a movie title above to search.</p>;
        }
        if (filteredMovies.length > 0) {
            return filteredMovies.map((movie) => <Moviecard key={movie.id} movie={movie} />);
        }
        return (
            <p className="movie_list_message">
                {isSearch ? `No movies found matching "${query}".` : "Nothing found in this category"}
            </p>
        );
    };

    return (
        <section className="movielist" id={type}>
            <header className="movie_list_header">
                <h2 className="movie_list_title">{headerTitle}</h2>

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

            <div className="movie_cards">{renderContent()}</div>
        </section>
    );
};

export default MovieList;
