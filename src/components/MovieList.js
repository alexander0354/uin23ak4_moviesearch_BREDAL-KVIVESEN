import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";


//komponent for å fetche filmer til nettsiden

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // "default search query" for å hente 10 James Bond-filmer
    fetchMovies("James+Bond");
  }, []);

  // Async - await syntax for å hente filmdata fra APIet
  const fetchMovies = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ffceff3589088ca1ba677a8bfff757d8&query=${query}`
    );
    const data = await response.json();
    // Henter kun de første 10 filmene fra svaret
    setMovies(data.results.slice(0, 10));
  };

  // Håndterer søk fra brukeren
  const handleSearch = (searchWord) => {
    // Bruker søkeordet og legger til resten av query-variablene for å hente de første 10 resultatene
    fetchMovies(`${searchWord}`);
  };

  return (
    <div>
      {/*Importerer SearchBar til liste-komponentet */}
      <SearchBar onSearch={handleSearch} />
      <div className="movie-list">
        {/*Lager en MovieCard-komponent for hver film*/}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;