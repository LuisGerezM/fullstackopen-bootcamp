import React, { useEffect, useState } from "react";
import { kelvinToCent } from "../helpers/kelvinToCent/kelvinToCent";
import { getAllCountries } from "../services/countries/getAllCountries";
import { getWather } from "../services/wather/getWather";

const CountriDetails = ({ countriesFound }) => {
  const [watherReport, setWatherReport] = useState({});
  const [watherLoading, setWatherLoading] = useState(false);

  useEffect(() => {
    if (countriesFound.length !== 0) {
      // console.log('SETENAOD LOADING');
      setWatherLoading(true);
      const [
        {
          name: { common },
        },
      ] = countriesFound;
      // setCentigrados(kelvinACentrigrados(temp));
      //
      getWather(common)
        .then((res) => setWatherReport(res))
        .catch((e) => console.log("error", e));
    }
    // return () => {
    //   second;
    // };
  }, [countriesFound]);

  useEffect(() => {
    // console.log("AQUIIII", watherReport);
    Object.keys(watherReport).length !== 0 && setWatherLoading(false);
  }, [watherReport]);

  if (countriesFound.length === 0) return null;
  // https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiClima}
  const [
    {
      name: { common },
      capital,
      population,
      languages,
      coatOfArms,
    },
  ] = countriesFound;

  return (
    <>
      <div>
        <h1>{common}</h1>
        <br />
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <br />
        <h3>Languages</h3>
        {
          // devuelve una matriz de pares propios de una propiedad enumerable [key, value] de un objeto dado, en el mismo orden que es proporcionado por for...in
          Object.entries(languages).map(([item, value]) => {
            // console.log(value);
            return <p key={item}>{value}</p>;
          })
        }

        <img src={coatOfArms.png} alt="country flag" style={{ width: "40%" }} />
        <br />
        {watherLoading ? (
          <p>
            <strong>Getting information of wather....</strong>
          </p>
        ) : (
          Object.keys(watherReport).length !== 0 && (
            <>
              <h3> Weather in {capital}</h3>
              <p>
                {" "}
                <strong>Temperature:</strong>{" "}
                {kelvinToCent(watherReport.main.temp)} &#8451;
              </p>
              <p>
                {" "}
                <strong>Wind:</strong> {watherReport.wind.speed} km/h{" "}
              </p>
            </>
          )
        )}
      </div>
    </>
  );
};

export default CountriDetails;
