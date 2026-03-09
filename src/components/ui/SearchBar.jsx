import { useState } from "react";
import formatInput from "../../utils/formatInput";

export default function SearchBar({ setLocationQuery, isSearching }) {
  const MAX_HISTORY = 4;

  const [searchInput, setSearchInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  /**
   * Ensures searchHistory doesn't exceed four items and no duplicates
   * @param {Array} history
   * @param {String} newCity
   * @returns {Array}
   */
  function addToHistory(history, newCity) {
    const filtered = history.filter((city) => city !== newCity);
    return [newCity, ...filtered].slice(0, MAX_HISTORY);
  }

  /**
   *
   * @param {dom event} e
   *
   */
  function handleSearch(e) {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLocationQuery(formatInput(searchInput));
    setSearchHistory((prev) => addToHistory(prev, searchInput));
    setSearchInput("");
  }

  /**
   * Handles click event for history dropdown
   * @param {String} city
   */
  function handleHistory(city) {
    setSearchInput(city);
    setLocationQuery(formatInput(city));
    setSearchHistory((prev) => addToHistory(prev, city));
    setIsFocused(false);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row items-center gap-5 w-full max-w-xl"
    >
      <div className="relative w-full md:flex-1">
        {/* Input */}
        <div
          className="flex items-center gap-3 bg-card rounded-xl px-4 py-3.5
            ring-1 ring-transparent focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-ink"
        >
          <img
            src="assets/images/icon-search.svg"
            alt="Search"
            className="w-5 h-5 opacity-50"
          />
          <input
            type="text"
            name="search"
            placeholder="Search for a place..."
            value={searchInput}
            autoComplete="off"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-transparent flex-1 text-font-muted placeholder:text-font-muted text-sm outline-none"
            required
          />
        </div>

        {/* History Dropdown */}
        {isFocused && searchHistory.length > 0 && (
          <ul className="absolute top-full left-0 w-full mt-2 p-2 bg-card rounded-xl overflow-hidden z-50 shadow-lg">
            {searchHistory.map((city) => (
              <li
                key={city}
                onMouseDown={() => handleHistory(city)}
                className="px-4 py-2.5 text-sm text-white hover:bg-ghost cursor-pointer flex items-center gap-2 rounded-lg transition-colors duration-100"
              >
                {city}
              </li>
            ))}
          </ul>
        )}

        {/* Searching Dropdown */}
        {/* {isSearching && (
          <div className="absolute top-full left-0 w-full mt-2 p-1 bg-card rounded-xl overflow-hidden z-50 shadow-lg">
            <div className="px-4 py-2.5 text-sm text-white flex items-center gap-2">
              <img src="assets/images/icon-loading.svg" alt="Loading Icon" />
              <span>Search in progress</span>
            </div>
          </div>
        )} */}
      </div>

      {/* Search Button */}
      <button
        type="submit"
        disabled={isSearching}
        className={`w-full md:w-fit text-sm bg-accent hover:bg-accent-hover text-font-main px-6 py-3.5 rounded-xl transition-colors duration-200 whitespace-nowrap
                        ring-1 ring-transparent focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-ink ${isSearching ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isSearching ? "Searching.." : "Search"}
      </button>
    </form>
  );
}
