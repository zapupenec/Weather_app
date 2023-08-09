import { useState, useRef, useEffect } from 'react';
import { WeatherAppContext } from './WeatherAppContext';
import { requestForecast, requestLocation } from '../support';
import forecast from './mock'

export const WeatherAppProvider = ({ children }) => {
  const [formState, setFormState] = useState('filling'); // filling, waiting

  const [searchPanelState, setSearchPanelState] = useState('hidden');
  const searchInputRef = useRef();

  const handlerSearchPanelState = (state) => () => {
    setSearchPanelState(state);
    if (state === 'shown') {
      searchInputRef.current.focus();
    }
  };

  const [currentLocation, setCurrentLocation] = useState({});
  const handlerCurrentLocation = (city) => () => {
    setCurrentLocation(city);
  }

  useEffect(() => {
    setFormState('waiting');

    async function fetchData() {
      const location = await requestLocation('Москва');
      handlerCurrentLocation(location)();
      console.log(await requestForecast(location));
      setFormState('filling');
    }
    fetchData();
  }, []);

  const providedData = {
    forecast,
    formState,
    setFormState,
    searchPanelState,
    handlerSearchPanelState,
    currentLocation,
    handlerCurrentLocation,
    searchInputRef,
  };

  return (
    <WeatherAppContext.Provider value={providedData}>
      {children}
    </WeatherAppContext.Provider>
  );
};
