import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";
import Pagination from "./Pagination";

export default function CountriesList({ query }) {
  let [countriesData, setCountriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(8);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,languages,currencies,borders,tld"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  const LastCountryIndex = currentPage * countriesPerPage;
  const FirstCountryIndex = LastCountryIndex - countriesPerPage;
  const currentCountries = countriesData.slice(
    FirstCountryIndex,
    LastCountryIndex
  );
  console.log(currentCountries);
  if (countriesData.length === 0) {
    return <CountriesListShimmer />;
  }

  return (
    <>
      <div className="countries-container">
        {currentCountries
          .filter((country) => {
            return (
              country.name.common.toLowerCase().includes(query) ||
              country.region.toLowerCase().includes(query)
            );
          })
          .map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population.toLocaleString("en-IN")}
                region={country.region}
                capital={country.capital?.[0]}
                country={country}
              />
            );
          })}
      </div>
      <Pagination
        totalCountries={countriesData.length}
        countriesPerPage={countriesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
