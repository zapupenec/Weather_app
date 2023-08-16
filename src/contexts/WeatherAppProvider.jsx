import { useState, useRef, useEffect } from 'react';
import { WeatherAppContext } from './WeatherAppContext';
import { requestDataFrom, parseData } from '../utils';

const initialForecastObj = {
  main: {
    description: '',
    temperature: 0,
    feeling: 0,
    wind: {
      speed: 0,
      description: '',
      id: 0,
    },
    humidity: 0,
    visibility: 0,
    pressure: 0,
  },

  days: new Array(6).fill({
    date: new Date(),
    description: '',
    icon: '',
    temperatureDay: 0,
    temperatureNight: 0,
  }),

  hours: new Array(6).fill({
    time: '',
    description: '',
    icon: '',
    temperature: 0,
  }),
};

export const WeatherAppProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [forecast, setForecast] = useState(initialForecastObj);
  const [currentLocation, setCurrentLocation] = useState({});
  const handleCurrentLocation = (city) => () => {
    setCurrentLocation(city);
  }

  const [processError, setProcessError] = useState([]);
  const [processState, setProcessState] = useState('filling');
  // filling, waiting, error, networkError 
  // попробовать реализовать состояние initial

  const searchInputRef = useRef(null);
  const btnSubmitRef = useRef(null);
  const searchHistoryRef = useRef(null);

  const handleProcessState = (state) => {
    setProcessState(state);

    searchInputRef.current.disabled = false;
    btnSubmitRef.current.disabled = false;

    if (searchHistoryRef.current) {
      searchHistoryRef.current.childNodes.forEach((child) => {
        child.disabled = false;
      });
    }

    switch (state) {
      case 'filling':
        break;
      case 'waiting':
        setProcessError('');
        searchInputRef.current.disabled = true;
        btnSubmitRef.current.disabled = true;
        if (searchHistoryRef.current) {
          searchHistoryRef.current.childNodes.forEach((child) => {
            child.disabled = true;
          });
        }
        break;
      case 'error':
        setProcessError('Упс! Город не найден, попробуйте другой');
        break;
      case 'networkError':
        setProcessError('Ошибка сети!');
        break;
      default:
        throw new Error(`Unknown form state: ${state}`);
    }
  };

  const [searchPanelState, setSearchPanelState] = useState('hidden');
  const handleSearchPanelState = (state) => () => {
    setSearchPanelState(state);
    if (state === 'shown') {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    const wrapFunction = async () => {
      handleProcessState('waiting');
      try {
        const { location, data } = await requestDataFrom('search', 'Москва');

        handleCurrentLocation(location)();
        setForecast((prevForecast) => ({ ...prevForecast, ...parseData(data) }))

        handleProcessState('filling');
      } catch (error) {
        if (error.isNetwork) {
          handleProcessState('networkError');
        } else {
          handleProcessState('error');
        }

        console.error(error);
      }
    }

    wrapFunction();
  }, []);

  const providedData = {
    date,
    setDate,
    forecast,
    setForecast,
    currentLocation,
    handleCurrentLocation,
    processError,
    setProcessError,
    processState,
    handleProcessState,
    searchPanelState,
    handleSearchPanelState,
    searchInputRef,
    btnSubmitRef,
    searchHistoryRef,
  };

  return (
    <WeatherAppContext.Provider value={providedData}>
      {children}
    </WeatherAppContext.Provider>
  );
};
