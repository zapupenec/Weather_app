import { useState, useContext } from "react";
import { SearchForm, SearchHistory } from ".";
import { ErrorProvider, WeatherAppContext } from "../../contexts";

export function SearchPanel({ block }) {
  const {
    searchPanelState,
    handleSearchPanelState,
  } = useContext(WeatherAppContext);

  const [searchHistory, setSearcHistory] = useState([]);
  const addSeachHistory = (cityName) => {
    const maxLength = 5;
    if (searchHistory.length < maxLength) {
      setSearcHistory([cityName, ...searchHistory]);
      return;
    }
    setSearcHistory([cityName, ...searchHistory.slice(0, -1)]);
  };

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
        onClick={handleSearchPanelState('hidden')}
      />
      <ErrorProvider>
        <SearchForm
          searchHistory={searchHistory}
          addSeachHistory={addSeachHistory}
        />
        {searchHistory.length !== 0 && <SearchHistory
          history={searchHistory}
        />}
      </ErrorProvider>
    </div>
  );
}
