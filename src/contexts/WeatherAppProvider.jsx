import { useState, useRef, useEffect } from 'react';
import { WeatherAppContext } from './WeatherAppContext';
import { parseWeather, requestWeather, requestForecast, requestLocation, parseForecast } from '../utils';
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

      const dataWeather = await requestWeather(location);
      const main = parseWeather(dataWeather);

      const dataForecast = await requestForecast(location);
      const hours = parseForecast(dataForecast, 'hours');
      const days = parseForecast(dataForecast, 'days');

      setForecast((prevForecast) => ({ ...prevForecast, date, main, hours, days }))

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
