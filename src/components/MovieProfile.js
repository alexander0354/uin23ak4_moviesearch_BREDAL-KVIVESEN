import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../sass/MovieProfile.scss';

// Komponent for mer detaljert oversikt over en enkelt film (Ekstraoppgave)
function MovieProfile() {
  // Henter id fra URL-en ved hjelp av useParams() fra react-router-dom
  const { id } = useParams();
  console.log('movieId:', id);

  // Oppretter state for movie-objektet, med null som standardverdi
  const [movie, setMovie] = useState(null);

  // useEffect-hook som kjører fetchMovieDetails() når komponenten lastes inn, eller når id endres
  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  // Async funksjon som henter detaljert informasjon om en film fra API-et ved hjelp av fetch()
  const fetchMovieDetails = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ffceff3589088ca1ba677a8bfff757d8&append_to_response=credits`);
    const data = await response.json();
    setMovie(data);
  };

  // Hvis movie-objektet eller movie.credits ikke finnes, returnerer vi "Loading..."-melding
  if (!movie || !movie.credits) {
    return <div>Loading...</div>;
  }

  // Oppretter variabler for posterUrl, tittel, årstall, sjanger, regissør og skuespillere
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x444?text=No+Poster+Available';
  const title = movie.title ? movie.title : "Title Not Available";
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "Year Not Available";
  const genres = movie.genres.map((genre) => genre.name).join(', ');
  const director = movie.credits.crew.find((crewMember) => crewMember.job === 'Director')?.name || 'Not Available';
  const cast = movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(', ');

  // Returnerer et div-element med detaljert informasjon om filmen
  return (
    <div className="movie-profile">
      <div className="movie-profile-header">
        <img src={posterUrl} alt={movie.title} />
        <div className="movie-profile-info">
          <h1>{title} ({year})</h1>
          <h2>Genres: {genres}</h2>
          <h3>Director: {director}</h3>
          <h4>Cast: {cast}</h4>
        </div>
      </div>
      <div className="movie-profile-description">
        <h2>Overview</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieProfile;