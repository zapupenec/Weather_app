import { useContext } from 'react';
import { getDisplayForecastDay } from '../../utils';
import { WeatherAppContext } from '../../contexts';
import { Loader } from '..';

export function PanelDay({ date, forecastDay }) {
  const {
    dataTime,
    dateDisplay,
  } = getDisplayForecastDay(forecastDay.date, date);

  const { formState } = useContext(WeatherAppContext);

  return (
    <article className="panel-day">
      {formState === 'waiting' ? <Loader /> : (
        <>
          <time className="panel-day__date" dateTime={dataTime}>{dateDisplay}</time>
          <img
            className="panel-day__image"
            src={forecastDay.icon ? `https://openweathermap.org/img/wn/${forecastDay.icon}@2x.png` : ''}
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
