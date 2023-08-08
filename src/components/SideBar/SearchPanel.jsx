import React, { useState } from "react";
import { SearchForm, SearchHistory } from ".";

export function SearchPanel({ block, activeCity, handlerActiveCity, searchPanelState, handlerSearchPanelState, searchInputRef }) {
  const [searchHistory, setSearcHistory] = useState([]);
  const addSeachHistory = (cityName) => {
    const maxLength = 5;
    if (searchHistory.length < maxLength) {
      setSearcHistory([cityName, ...searchHistory]);
      return;
    }
    setSearcHistory([cityName, ...searchHistory.slice(0, -1)]);
  }

  const searchPanelClassName = [
    block ? `${block}__search-panel` : "",
    "search-panel",
    searchPanelState === "shown" ? "search-panel_shown" : "",
  ].join(" ").trim();

  return (
    <div className={searchPanelClassName}>
      <button
        className="search-panel__button-close button-close"
        type="button"
        id="button-close-search-panel"
        onClick={handlerSearchPanelState('hidden')}
      />
      <SearchForm
        handlerActiveCity={handlerActiveCity}
        searchInputRef={searchInputRef}
        searchHistory={searchHistory}
        addSeachHistory={addSeachHistory}
      />
      {searchHistory.length !== 0 && <SearchHistory
        history={searchHistory}
        activeCity={activeCity}
        handlerActiveCity={handlerActiveCity}
      />}
    </div>
  );
}
