import { useContext } from 'react';
import { SearchContext, WeatherAppContext } from '../../contexts';
import { parseData, requestDataFrom } from '../../utils';

export function SearchHistory() {
  const {
    setDate,
    setForecast,
    currentLocation,
    handleCurrentLocation,
    handleProcessState,
    handleSearchPanelState,
    searchHistoryRef,
  } = useContext(WeatherAppContext);

  const {
    setSearchValue,
    searchHistory,
  } = useContext(SearchContext);

  const handleClick = (locationFromHistory) => async (e) => {
    e.preventDefault();
    setDate(new Date());

    handleProcessState('waiting');
    try {
      const { location, data } = await requestDataFrom('history', locationFromHistory);

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

      console.error(error);
    }
  };

  const searchHistoryClassName = [
    'search-history',
  ].join(' ').trim();

  return (
    <div className={searchHistoryClassName} ref={searchHistoryRef}>
      {searchHistory.map((location, i) => (
        <button
          key={`location_${searchHistory.length + i + 1}`}
          className={`search-history__item${location.cityName === currentLocation.cityName ? ' search-history__item_active' : ''}`}
          onClick={handleClick(location)}
        >{location.cityName}</button>
      ))}
    </div>
  );
}
