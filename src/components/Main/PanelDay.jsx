import { useContext } from 'react';
import { getDisplayForecastDay } from '../../support';
import { WeatherAppContext } from '../../contexts';
import { Loader } from '.';

export function PanelDay({ today, forecastDay }) {
  const {
    dataTime,
    dateDisplay,
  } = getDisplayForecastDay(forecastDay.date, today.date,);

  const { formState } = useContext(WeatherAppContext);

  return (
    <article className="panel-day">
      {formState === 'waiting' ? <Loader /> : (
        <>
          <time className="panel-day__date" dateTime={dataTime}>{dateDisplay}</time>
          <img
            className="panel-day__image"
            src={`./image/panel/${forecastDay.description}.svg`}
            alt={forecastDay.description}
          />
          <div className="panel-day__temperature">
            <span className="panel-day__temperature-day">{forecastDay.temperatureDay}°C</span>
            <span className="panel-day__temperature-night">{forecastDay.temperatureNight}°C</span>
          </div>
        </>
      )}
    </article>
  );
}
