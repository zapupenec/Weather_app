const getDisplayForecastDay = (date, today) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const dataTime = `${year}-${month}-${day}`;

  let dateDisplay;
  if (!!today && date.getDate() - today.getDate() === 1) {
    dateDisplay = 'Завтра';
  } else {
    const dateString = date.toLocaleDateString('ru-RU', {
      month: 'short',
      weekday: 'short',
      day: 'numeric',
    });
    dateDisplay = `${dateString[0].toUpperCase()}${dateString.slice(1, -1)}`;
  }

  return {
    dataTime,
    dateDisplay,
  };
};

export default getDisplayForecastDay;