const toUpperCaseFirstlLetter = (str) => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`

export const parseMainForecast = (data) => ({
  description: toUpperCaseFirstlLetter(data.weather[0].description),
  icon: data.weather[0].icon,
  temperature: Math.round(data.main.temp),
  feeling: Math.round(data.main.feels_like),
  wind: Math.round(data.wind.speed * 10) / 10,
  directionWind: 'СЗ',
  humidity: (data.main.humidity * 0,75),
  pressure: data.main.pressure,
  visibility: Math.round(data.visibility / 1000 * 10) / 10,
});