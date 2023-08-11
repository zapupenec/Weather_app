import { useContext } from "react";
import { WeatherAppContext } from "../../contexts";
import { Loader } from '..';

export function PanelHour({ forecastHour }) {
  const hours = forecastHour.time === 0 ? forecastHour.time : `${forecastHour.time}`.padStart(2, '0');
  const { formState } = useContext(WeatherAppContext);

  return (
    <article className="panel-hour">
      {formState === 'waiting' ? <Loader /> : (
        <>
          <time className="panel-hour__date" dateTime={`${hours}:00`}>{hours}:00</time>
          <img
            className="panel-hour__image"
            src={forecastHour.icon ? `https://openweathermap.org/img/wn/${forecastHour.icon}@2x.png` : ''}
            alt={forecastHour.description}
          />
          <div className="panel-hour__temperature">{forecastHour.temperature}°C</div>
        </>
      )}
    </article>
  );
}
