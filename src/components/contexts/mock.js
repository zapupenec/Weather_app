const forecast = {
  today: {
    date: new Date('March 13, 2016 14:00:00'),
    description: 'Снег',
    temperature: 1,
    feeling: -3,
    wind: 7,
    directionWind: 'СЗ',
    humidity: 84,
    visibility: 6.2,
    pressure: 742,
  },

  days: [
    {
      description: 'default',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'rain',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'rain',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      temperatureDay: 10,
      temperatureNight: 4,
    },
  ],

  hours: [
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      temperature: 10,
    },
  ],
};

forecast.days = forecast.days.map((dataDay, i) => {
  dataDay.date = new Date(forecast.today.date);
  dataDay.date.setDate(dataDay.date.getDate() + 1 + i);
  return dataDay;
});

forecast.hours = forecast.hours.map((dataDay, i) => {
  const date = new Date(forecast.today.date);
  date.setHours(date.getHours() + 1 + i);
  dataDay.time = date.getHours();
  return dataDay;
});

export default forecast;
