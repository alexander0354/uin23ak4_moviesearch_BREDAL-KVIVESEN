import React from 'react';
import { useHistory } from 'react-router-dom';
import '../sass/MovieCard.scss';


//Komponent som viser tittel og plakat i kort "egt inni en div.."


// Definerer MovieCard-komponenten med movie-objektet som et prop, med tom objekt som standardverdi
const MovieCard = ({ movie = {} }) => {
  // Henter nødvendige egenskaper fra movie-objektet ved hjelp av destrukturering
  const { poster_path, id, title } = movie;

  // Template literal - Henter URL for filmplakaten ved å konkatinere poster_path. Hvis poster_path ikke blir funnet hentes URL for "placeholder" bildet.
  const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/300x444?text=No+Poster+Available';

  // useHistory fra react-router-dom for å navigere mellom sider.
  const history = useHistory();

  //Funksjon som håndterer klikk på "More about this movie"-knappen.
  const handleClick = () => {
    // Navigerer til siden for den aktuelle filmen basert på filmens ID
    history.push(`/movie/${id}`);
  };

  return (
    <div className="movie-card">
      <h3>{title}</h3>
      <img src={posterUrl} alt={title} />
      <button onClick={handleClick}>Mer om filmen!</button>
    </div>
  );
};
export default MovieCard;