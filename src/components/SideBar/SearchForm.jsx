import { useContext } from "react";
import { Button } from ".";
import { SearchContext, WeatherAppContext } from "../../contexts";
import { parseData, requestDataFrom } from "../../utils";

const hasLocation = (searchHistory, location) => !!searchHistory.find((log) => log.cityName === location.cityName);

export function SearchForm() {
  const {
    setDate,
    setForecast,
    handleCurrentLocation,
    processError,
    handleProcessState,
    handleSearchPanelState,
    searchInputRef,
    btnSubmitRef,
  } = useContext(WeatherAppContext);

  const {
    searchValue,
    setSearchValue,
    searchHistory,
    addSeachHistory,
  } = useContext(SearchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDate(new Date());

    handleProcessState('waiting');
    try {
      const { location, data } = await requestDataFrom('search', searchValue);

      if (!hasLocation(searchHistory, location)) {
        addSeachHistory(location);
      }

      handleCurrentLocation(location)();
      setForecast((prevForecast) => ({ ...prevForecast, ...parseData(data) }))

      handleSearchPanelState('hidden')();
      setSearchValue('');

      handleProcessState('filling');
    } catch (error) {
      if (error.isNetwork) {
        handleProcessState('networkError');
      } else {
        handleProcessState('error');
      }

      searchInputRef.current.focus();
      console.error(error);
    }
  };

  const handleChange = async ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__search-field">
        <input
          className="search-form__search-input"
          type="search"
          name="search"
          placeholder="Поиск"
          ref={searchInputRef}
          value={searchValue}
          onChange={handleChange}
        />
        <span className="search-form__search-border"></span>
      </div>
      <Button block="search-form" size="small" type="submit" btnSubmitRef={btnSubmitRef}>Найти</Button>
      {(processError !== '') && <div className="search-form__feedback">{processError}</div>}
    </form>
  );
}
