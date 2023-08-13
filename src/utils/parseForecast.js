const getTime = (date) => `${`${date.getHours()}`.padStart(2, '0')}:00`;
const getСondition = (interval, firstHours) => {
  if (firstHours >= interval && firstHours < interval * 2) {
    return true;
  }
  if (firstHours >= interval + 12 && firstHours < interval * 2 + 12) {
    return true;
  }
  return false;
};

export const parseForecast = (data, type) => {
  if (type === 'hours') {
    const hourCardsCount = 12;
    return data.list.slice(0, hourCardsCount)
      .reduce((acc, item) => [...acc, {
        time: getTime(new Date(item.dt_txt)),
        temperature: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }], []);
  }

  if (type === 'days') {
    const daysCardsCount = 6;
    const hourInterval = 3;

    const today = new Date();
    const firstHoursFourcast = new Date(data.list[0].dt_txt).getHours();

    const nightHours = getСondition(hourInterval, firstHoursFourcast) ? 0 : 3;
    const dayHours = getСondition(hourInterval, firstHoursFourcast) ? 12 : 15;

    const filteredList = data.list
      .filter((item) => new Date(item.dt_txt).getDate() !== today.getDate())
      .slice(0, daysCardsCount * (24 / hourInterval))

    const nightFourcasts = filteredList.filter((item) => new Date(item.dt_txt).getHours() === nightHours);
    const dayFourcasts = filteredList.filter((item) => new Date(item.dt_txt).getHours() === dayHours);

    const weekForecast = [];
    for (let i = 0; i < dayFourcasts.length; i += 1) {
      const forecast = {
        date: new Date(dayFourcasts[i].dt_txt),
        description: dayFourcasts[i].weather[0].description,
        icon: dayFourcasts[i].weather[0].icon,
        temperatureDay: Math.round(dayFourcasts[i].main.temp),
        temperatureNight: Math.round(nightFourcasts[i].main.temp),
      }
      weekForecast.push(forecast);
    }

    return weekForecast;
  }
};
