import { useContext } from "react";
import { SearchContext, WeatherAppContext } from "../../contexts";
import { parseForecast, parseWeather, requestForecast, requestWeather } from "../../utils";

export function SearchHistory() {
  const {
    setForecast,
    currentLocation,
    handleCurrentLocation,
    handleSearchPanelState,
    setFormState,
  } = useContext(WeatherAppContext);

  const {
    setError,
    setSearchValue,
    searchHistory,
  } = useContext(SearchContext);

  const handleClick = (location) => async () => {
    setError('');
    setFormState('waiting');

    try {
      const date = new Date();

      const dataWeather = await requestWeather(location);
      const main = parseWeather(dataWeather);

      const dataForecast = await requestForecast(location);
      const hours = parseForecast(dataForecast, 'hours');
      const days = parseForecast(dataForecast, 'days');

      setForecast((prevForecast) => ({ ...prevForecast, date, main, hours, days }))

      handleCurrentLocation(location)();
      setSearchValue('');
      handleSearchPanelState('hidden')();
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setError('Ошибка сети!');
      }
      console.error(error);
    }
    setFormState('filling');
  }

  const searchHistoryClassName = [
    "search-history",
  ].join(" ").trim();

  return (
    <div className={searchHistoryClassName}>
      {searchHistory.map((location, i) => (
        <p
          key={`location_${searchHistory.length + i + 1}`}
          className={`search-history__item${location.cityName === currentLocation.cityName ? " search-history__item_active" : ""}`}
          onClick={handleClick(location)}
        >{location.cityName}</p>
      ))}
    </div>
  );
}
