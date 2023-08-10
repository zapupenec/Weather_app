import { useState, useRef, useEffect } from 'react';
import { WeatherAppContext } from './WeatherAppContext';
import { parseMainForecast, requestForecast, requestLocation } from '../support';
import mockForecast from './mock'

export const WeatherAppProvider = ({ children }) => {
  const [formState, setFormState] = useState('filling'); // filling, waiting

  const [searchPanelState, setSearchPanelState] = useState('hidden');
  const searchInputRef = useRef();

  const handleSearchPanelState = (state) => () => {
    setSearchPanelState(state);
    if (state === 'shown') {
      searchInputRef.current.focus();
    }
  };

  const [currentLocation, setCurrentLocation] = useState({});
  const handleCurrentLocation = (city) => () => {
    setCurrentLocation(city);
  }

  const [forecast, setForecast] = useState(mockForecast);

  useEffect(() => {
    setFormState('waiting');

    async function fetchData() {
      const date = new Date();
      const location = await requestLocation('Москва');

      handleCurrentLocation(location)();
      const dataForecast = await requestForecast(location);

      const main = parseMainForecast(dataForecast);
      setForecast((prevForecast) => ({ ...prevForecast, date, main }))

      setFormState('filling');
    }
    fetchData();
  }, []);

  const providedData = {
    forecast,
    setForecast,
    formState,
    setFormState,
    searchPanelState,
    handleSearchPanelState,
    currentLocation,
    handleCurrentLocation,
    searchInputRef,
  };

  return (
    <WeatherAppContext.Provider value={providedData}>
      {children}
    </WeatherAppContext.Provider>
  );
};
