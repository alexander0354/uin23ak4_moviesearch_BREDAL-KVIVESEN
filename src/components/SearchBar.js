import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../sass/SearchBar.scss";

function SearchBar({onSearch}) {
  // Henter ut søkeord fra URL
  const { searchQuery } = useParams();
  // Tilstand som holder på søkeordet, og oppdateres hver gang det endres
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  // Bruker useHistory for å navigere til resultat-siden ved søk
  const history = useHistory();

  // Funksjon som kjører når bruker trykker på søke-knappen
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Søker kun hvis brukeren har skrevet inn et gyldig søkeord (minst 3 tegn)
    if (searchTerm && searchTerm.length >= 3) {
       // Navigerer til resultat-siden basert på søkeordet i URL-en
      history.push(`/search/${searchTerm}`);
      // Kaller på onSearch-funksjonen som blir sendt som prop fra MovieList
      onSearch(searchTerm);
    }
  };

   // useEffect hook som oppdaterer søkeordet i tilstanden basert på endringer i URL-en
  useEffect(() => {
    setSearchTerm(searchQuery || "");
  }, [searchQuery]);

  // Funksjon som kjører når brukeren endrer teksten i søkefeltet
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit} className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Søk etter film!"
      />
      <button type="submit">Søk</button>
    </form>
  );
}

export default SearchBar;