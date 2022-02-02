import React from "react";

const CountriesDetails = ({ countriesFound, handleDeailsClick }) => {
  return (
    <>
      {countriesFound.map((element) => (
        // en el onclick pasar el elemento asi poder modificar otra condicion para ejecutar countri details
        <p key={element.ccn3}>
          {element.name.common}{" "}
          <button onClick={() => handleDeailsClick(element)}>show</button>
        </p>
      ))}
    </>
  );
};

export default CountriesDetails;
