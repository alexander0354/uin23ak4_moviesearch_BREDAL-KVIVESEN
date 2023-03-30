import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

//Komponent for søkeresultater basert på søkeordet i URLen.

function SearchResults() {
  //Henter søkeordet fra URLen ved hjelp av useParams
  const { searchQuery } = useParams();
  //Setter en tom liste som standardverdi for søkeresultater
  const [searchResults, setSearchResults] = useState([]);

  //Bruker useEffect til å utføre søket automatisk når komponenten lastes inn
  useEffect(() => {
    //Sjekker om søkeordet eksisterer og har minst 3 tegn før søket utføres
    if (searchQuery && searchQuery.length >= 3) {
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  //Funksjon for å utføre søket mot APIet
  const fetchSearchResults = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ffceff3589088ca1ba677a8bfff757d8&query=${query}`
    );
    const data = await response.json();
    //Setter søkeresultatene i state
    setSearchResults(data.results);
  };

  return (
    <div className="search-results">
      <h2>Søkeresultat</h2>
      {/*Bruker SearchBar-komponenten for å gjøre det mulig å søke på nytt*/}
      <SearchBar />
      {/*Mapper gjennom søkeresultatene og viser MovieCard-komponenten for hver film*/}
      <ul>
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;