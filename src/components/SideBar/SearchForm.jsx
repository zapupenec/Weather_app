import React, { useRef, useState } from "react";
import { Button } from ".";

const getRequestUrl = (city) => {
  const newUrl = new URL('https://nominatim.openstreetmap.org');
  newUrl.pathname = `/search`;
  newUrl.searchParams.set('format', 'json');
  newUrl.searchParams.set('namedetails', '1');
  newUrl.searchParams.set('limit', '1');
  newUrl.searchParams.set('q', city);
  return newUrl;
};

export function SearchForm({ handlerActiveCity, searchInputRef, searchHistory, addSeachHistory }) {
  const [formState, setFormState] = useState('filling');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState([]);
  const btnSubmitRef = useRef();

  const handlerFormState = (state) => {
    setFormState(state);
    switch (state) {
      case 'filling':
        searchInputRef.current.disabled = false;
        btnSubmitRef.current.disabled = false;
        break;
      case 'sending':
        searchInputRef.current.disabled = true;
        btnSubmitRef.current.disabled = true;
        break;
      default:
        throw new Error(`Unknown formState: ${state}`);
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      handlerFormState('sending');
      setError('');
      const response = await fetch(getRequestUrl(searchValue));
      const data = await response.json();
      const cityName = data[0].namedetails['name:ru'] || data[0].namedetails['name:en'] || data[0].namedetails['name'];
      setSearchValue('');
      handlerActiveCity(cityName)();
      if (!searchHistory.includes(cityName)) {
        addSeachHistory(cityName);
      }
      handlerFormState('filling');
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setError('Ошибка сети!');
        console.error(error);
        return;
      }
      handlerFormState('filling');
      searchInputRef.current.focus();
      setError('Упс! Город не найден, попробуйте другой');
      console.error(error);
    }
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
          id="search-field"
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
