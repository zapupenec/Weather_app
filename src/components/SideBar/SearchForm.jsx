import { useRef, useState, useContext } from "react";
import { Button } from ".";
import { ErrorContext, WeatherAppContext } from "../../contexts";
import { parseMainForecast, requestForecast, requestLocation } from "../../support";

const hasLocation = (searchHistory, location) => !!searchHistory.find((log) => log.cityName === location.cityName);

export function SearchForm({ searchHistory, addSeachHistory }) {
  const {
    setForecast,
    handleSearchPanelState,
    handleCurrentLocation,
    searchInputRef,
    setFormState,
  } = useContext(WeatherAppContext);

  const { error, setError } = useContext(ErrorContext);

  const [searchValue, setSearchValue] = useState('');
  const btnSubmitRef = useRef();

  const handleSubmit = async (e) => {
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

      handleCurrentLocation(location)();
      setSearchValue('');

      if (!hasLocation(searchHistory, location)) {
        addSeachHistory(location);
      }

      handleSearchPanelState('hidden')();
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
      {(error !== '') && <div className="search-form__feedback">{error}</div>}
    </form>
  );
}
