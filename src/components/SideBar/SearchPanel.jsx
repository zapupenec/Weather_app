import { useContext } from "react";
import { SearchForm, SearchHistory } from ".";
import { SearchContext, WeatherAppContext } from "../../contexts";

export function SearchPanel({ block }) {
  const {
    searchPanelState,
    handleSearchPanelState,
  } = useContext(WeatherAppContext);

  const {
    setError,
     setSearchValue,
    searchHistory,
  } = useContext(SearchContext);

  const closeSeachPanel = () => {
    setError('');
    setSearchValue('');
    handleSearchPanelState('hidden')();
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
        onClick={closeSeachPanel}
        aria-label="закрыть поиск"
      />
        <SearchForm />
        {searchHistory.length !== 0 && <SearchHistory />}
    </div>
  );
}
