import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";
import Pagination from "./Pagination";

export default function CountriesList({ query, selectedRegion }) {
  let [countriesData, setCountriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(8);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,languages,currencies,borders,tld"
    )
      .then((response) => response.json())
      .then((data) => setCountriesData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedRegion]);
// console.log("Selected Region:", selectedRegion);
// console.log("Regions in data:", countriesData.map((country) => country.region));

  const filteredCountries = countriesData.filter(
    (country) =>
      (!selectedRegion || country.region.toLowerCase() === selectedRegion) &&
      (query === "" ||
        country.name.common.toLowerCase().includes(query) ||
        country.region.toLowerCase().includes(query))
  );

  const LastCountryIndex = currentPage * countriesPerPage;
  const FirstCountryIndex = LastCountryIndex - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    FirstCountryIndex,
    LastCountryIndex
  );

  // console.log(currentCountries);
  if (countriesData.length === 0) {
    return <CountriesListShimmer />;
  }
  if (filteredCountries.length === 0) {
    return <h2 className="no-countries">No countries found</h2>;
  }

  return (
    <>
      <div className="countries-container">
        {currentCountries.map((country) => {
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
      {filteredCountries.length > countriesPerPage && (
        <Pagination
          totalCountries={filteredCountries.length}
          countriesPerPage={countriesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}
