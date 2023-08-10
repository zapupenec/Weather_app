import { useRef, useState, useContext } from "react";
import { Button } from ".";
import { ErrorContext, WeatherAppContext } from "../../contexts";
import { parseMainForecast, requestForecast, requestLocation } from "../../support";

const hasLocation = (searchHistory, location) => !!searchHistory.find((log) => log.cityName === location.cityName);

export function SearchForm({ searchHistory, addSeachHistory }) {
  const {
    setForecast,
    handlerSearchPanelState,
    handlerCurrentLocation,
    searchInputRef,
    setFormState,
  } = useContext(WeatherAppContext);

  const { error, setError } = useContext(ErrorContext);

  const [searchValue, setSearchValue] = useState('');
  const btnSubmitRef = useRef();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    setFormState('waiting');
    setError('');

    searchInputRef.current.disabled = true;
    btnSubmitRef.current.disabled = true;

    try {
      const date = new Date();
      const location = await requestLocation(searchValue)
      const dataForecast = await requestForecast(location);

      const main = parseMainForecast(dataForecast);
      setForecast((prevForecast) => ({ ...prevForecast, date, main }))

      handlerCurrentLocation(location)();
      setSearchValue('');

      if (!hasLocation(searchHistory, location)) {
        addSeachHistory(location);
      }

      handlerSearchPanelState('hidden')();
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setError('Ошибка сети!');
      } else {
        setError('Упс! Город не найден, попробуйте другой');
      }
      searchInputRef.current.focus();
      console.error(error);
    }

    setFormState('filling');
    searchInputRef.current.disabled = false;
    btnSubmitRef.current.disabled = false;
  };

  const handlerChange = async ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <form className="search-form" onSubmit={handlerSubmit}>
      <div className="search-form__search-field">
        <input
          className="search-form__search-input"
          type="search"
          name="search"
          placeholder="Поиск"
          ref={searchInputRef}
          value={searchValue}
          onChange={handlerChange}
        />
        <span className="search-form__search-border"></span>
      </div>
      <Button block="search-form" size="small" type="submit" btnSubmitRef={btnSubmitRef}>Найти</Button>
      {(error !== '') && <div className="search-form__feedback">{error}</div>}
    </form>
  );
}
