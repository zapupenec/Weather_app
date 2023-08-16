import { requestForecast } from './requestForecast';
import { requestLocation } from './requestLocation';
import { requestWeather } from './requestWeather';

export const requestDataFrom = async (place, searchLocation) => {
  try {
    let location;
    switch (place) {
      case 'search':
        location = await requestLocation(searchLocation);
        break;
      case 'history':
        location = searchLocation;
        break;
      default:
        throw new Error(`Unknown place fetch: ${place}`);
    }

    const dataWeather = await requestWeather(location);
    const dataForecast = await requestForecast(location);

    return {
      location,
      data: { dataWeather, dataForecast }
    };
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      error.isNetwork = true;
    }
    throw error;
  }
};