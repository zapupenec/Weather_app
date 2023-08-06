import React from "react";
import getDisplayForecastDay from "../getDisplayDate";

function PanelDay({ today, forecastDay }) {
  const {
    datatime,
    dateDisplay,
  } = getDisplayForecastDay(forecastDay.date, today.date,);

  return (
    <li className="panel-day">
      <time className="panel-day__date" dateTime={datatime}>{dateDisplay}</time>
      <img
        className="panel-day__image"
        src={`./image/panel/${forecastDay.description}.svg`}
        alt={forecastDay.description}
      />
      <div className="panel-day__temperature">
        <span className="panel-day__temperature-day">{forecastDay.temperatureDay}°C</span>
        <span className="panel-day__temperature-night">{forecastDay.temperatureNight}°C</span>
      </div>
    </li>
  );
}

export default PanelDay;
