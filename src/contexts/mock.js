// как его удалить теперь?)

const forecast = {
  date: new Date(),
  main: {
    description: 'Снег',
    temperature: 1,
    feeling: -3,
    wind: {
      speed: 7,
      description: 'C',
      id: 0,
    },
    humidity: 84,
    visibility: 6.2,
    pressure: 742,
  },

  days: [
    {
      description: 'default',
      icon: '50d',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'rain',
      icon: '10d',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'rain',
      icon: '10d',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      icon: '11d',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      icon: '11d',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      icon: '11d',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      icon: '11d',
      temperatureDay: 10,
      temperatureNight: 4,
    },
  ],

  hours: [
    {
      time: '15:00',
      description: 'default',
      icon: '50d',
      temperature: 10,
    },
    {
      description: 'default',
      icon: '50d',
      temperature: 10,
    },
    {
      description: 'default',
      icon: '50d',
      temperature: 10,
    },
    {
      description: 'default',
      icon: '50d',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      icon: '11d',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      icon: '11d',
      temperature: 10,
    },
    {
      description: 'default',
      icon: '50d',
      temperature: 10,
    },
    {
      description: 'default',
      icon: '50d',
      temperature: 10,
    },
    {
      description: 'default',
      icon: '50d',
      temperature: 10,
    },
    {
      description: 'default',
      icon: '50d',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      icon: '11d',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      icon: '11d',
      temperature: 10,
    },
  ],
};

forecast.days = forecast.days.map((dataDay, i) => {
  dataDay.date = new Date(forecast.date);
  dataDay.date.setDate(dataDay.date.getDate() + 1 + i);
  return dataDay;
});

forecast.hours = forecast.hours.map((dataDay, i) => {
  const date = new Date(forecast.date);
  date.setHours(date.getHours() + 1 + i);
  dataDay.time = date.getHours();
  return dataDay;
});

export default forecast;
