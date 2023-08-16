import { parseForecast } from './parseForecast';
import { parseWeather } from './parseWeather';

export const parseData = ({ dataWeather, dataForecast }) => {
  const main = parseWeather(dataWeather);
  const hours = parseForecast(dataForecast, 'hours');
  const days = parseForecast(dataForecast, 'days');
  return { main, hours, days };
}

