import { useContext } from "react";
import { ErrorContext, WeatherAppContext } from "../../contexts";
import { requestForecast } from "../../support";

export function SearchHistory({ history }) {
  const {
    currentLocation,
    handlerCurrentLocation,
    handlerSearchPanelState,
    setFormState,
  } = useContext(WeatherAppContext);

  const { setError } = useContext(ErrorContext);

  const handlerClick = (location) => async () => {
    setFormState('waiting');
    try {
      console.log(await requestForecast(location));
      handlerCurrentLocation(location)();
      handlerSearchPanelState('hidden')();
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
      {history.map((location, i) => (
        <p
          key={`location_${history.length + i + 1}`}
          className={`search-history__item${location.cityName === currentLocation.cityName ? " search-history__item_active" : ""}`}
          onClick={handlerClick(location)}
        >{location.cityName}</p>
      ))}
    </div>
  );
}
