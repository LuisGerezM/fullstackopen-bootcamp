import React, { useEffect, useState } from "react";
import CountriDetails from "./components/CountriDetails";
import CountriesDetails from "./components/CountriesDetails";
import { filterItems } from "./helpers/filterItemsByStrings/filterItemsByStrings";
import { getAllCountries } from "./services/countries/getAllCountries";

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [manyCountries, setManyCountries] = useState(false);

  const [countriesFound, setCountriesFound] = useState(null);
  const [showTenCountriesFound, setShowTenCountriesFound] = useState(false);

  const [countriShow, setCountriShow] = useState([]);
  const [showCountri, setShowCountri] = useState(false);

  useEffect(() => {
    getAllCountries()
      .then((response) => {
        setCountries(response);
      })
      .catch((e) => {
        setCountries({});
        console.log("error", e);
      });
  }, []);

  useEffect(() => {
    if (countries.length !== 0 && newSearch !== "") {
      let filter = filterItems(newSearch, countries);
      setLoadingSearch(false);

      if (filter.length > 0 && filter.length < 10) {
        setManyCountries(false);
        setCountriesFound(filter);
        setShowTenCountriesFound(true);
      } else {
        //console.log("en else", filter);
        setShowTenCountriesFound(false);
        setShowCountri(false);
        setCountriesFound(null);
        setManyCountries(true);
      }
    }
  }, [countries, newSearch]);

  useEffect(() => {
    countriShow ? setShowCountri(true) : setShowCountri(false);
  }, [countriShow]);

  const handleSearchCountries = (e) => {
    //setLoadingSearch(true);
    let length = e.target.value.length;
    let value = e.target.value;

    if (length > 0) {
      setNewSearch(value);
      setLoadingSearch(true);
    } else {
      setShowCountri(false)
      setLoadingSearch(false);
      setManyCountries(false);
    }
  };

  const handleDeailsClick = (element) => {
    // console.log("element", element);
    setCountriShow([element]);
    setShowCountri(true);
  };

  return (
    <div className="App">
      find countries:{" "}
      <input className="input" onChange={handleSearchCountries} />
      {manyCountries && <p>Too many matches, specify another filter</p>}
      {loadingSearch && <p>Buscando....</p>}
      {showCountri && <CountriDetails countriesFound={countriShow} />}
      {!showCountri &&
        showTenCountriesFound &&
        (countriesFound.length === 1 ? (
          <CountriDetails countriesFound={countriesFound} />
        ) : (
          <CountriesDetails
            countriesFound={countriesFound}
            handleDeailsClick={handleDeailsClick}
          />
          // )
        ))}
    </div>
  );
}

export default App;
