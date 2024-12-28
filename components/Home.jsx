import { useState } from "react";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { useTheme } from "../hooks/useThemes";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isDark] = useTheme();

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setSelectedRegion={setSelectedRegion} />
      </div>
      <CountriesList query={query} selectedRegion={selectedRegion} />
    </main>
  );
}
