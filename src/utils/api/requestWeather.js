const key = 'cb2eba931589ed1b53acc88484258ab0';

const genRequestWeatherUrl = (lat, lon) => {
  const newUrl = new URL('https://api.openweathermap.org');
  newUrl.pathname = `/data/2.5/weather`;
  newUrl.searchParams.set('lat', lat);
  newUrl.searchParams.set('lon', lon);
  newUrl.searchParams.set('appid', key);
  newUrl.searchParams.set('units', 'metric');
  newUrl.searchParams.set('lang', 'ru');
  return newUrl;
};

export const requestWeather = async ({ lat, lon }) => {
  const responseForecast = await fetch(genRequestWeatherUrl(lat, lon));
  return await responseForecast.json();
};