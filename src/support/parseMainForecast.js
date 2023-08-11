const toUpperCaseFirstlLetter = (str) => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`

const windMap = {
  0: 'С',
  1: 'ССВ',
  3: 'ВСВ',
  4: 'В',
  5: 'ВЮВ',
  6: 'ЮВ',
  7: 'ЮЮВ',
  8: 'Ю',
  9: 'ЮЮЗ',
  10: 'ЮЗ',
  11: 'ЗЮЗ',
  12: 'З',
  13: 'ЗСЗ',
  14: 'СЗ',
  15: 'ССЗ',
  16: 'С',
};

const getWindData = (speed, deg) => {
  const directionCount = Object.keys(windMap).length - 1;
  const divider = 360 / directionCount;
  const id = Math.round(deg / divider);

  return {
    speed: Math.round(speed * 10) / 10,
    description: windMap[id],
    id,
    deg,
  };
};

export const parseMainForecast = (data) => ({
  description: toUpperCaseFirstlLetter(data.weather[0].description),
  icon: data.weather[0].icon,
  temperature: Math.round(data.main.temp),
  feeling: Math.round(data.main.feels_like),
  wind: getWindData(data.wind.speed, data.wind.deg),
  humidity: (data.main.humidity * 0,75),
  pressure: data.main.pressure,
  visibility: Math.round(data.visibility / 1000 * 10) / 10,
});
