import { useState, } from 'react'
import { SearchContext } from './SearchContext';

export const SearchProvider = ({ children }) => {
  const [error, setError] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearcHistory] = useState([]);
  const addSeachHistory = (cityName) => {
    const maxLength = 5;
    if (searchHistory.length < maxLength) {
      setSearcHistory([cityName, ...searchHistory]);
      return;
    }
    setSearcHistory([cityName, ...searchHistory.slice(0, -1)]);
  };

  const providedData = {
    error,
    setError,
    searchValue,
    setSearchValue,
    searchHistory,
    addSeachHistory,
  }

  return (
    <SearchContext.Provider value={providedData}>
      {children}
    </SearchContext.Provider>
  );
};
