import React from "react";

function PanelHour({ forecastHour }) {
  const hours = forecastHour.time === 0 ? forecastHour.time : `${forecastHour.time}`.padStart(2, '0');

  return (
    <li className="panel-hour">
      <time className="panel-hour__date" dateTime={`${hours}:00`}>{hours}:00</time>
      <img
        className="panel-hour__image"
        src={`./image/panel/${forecastHour.description}.svg`}
        alt={forecastHour.description}
      />
      <div className="panel-hour__temperature">{forecastHour.temperature}°C</div>
    </li>
  );
}

export default PanelHour;
