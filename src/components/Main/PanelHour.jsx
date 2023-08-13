import { useContext } from "react";
import { WeatherAppContext } from "../../contexts";
import { Loader } from '..';

export function PanelHour({ forecastHour }) {
  const { formState } = useContext(WeatherAppContext);
  const {
    time,
    temperature,
    icon,
    description,
  } = forecastHour;

  return (
    <article className="panel-hour">
      {formState === 'waiting' ? <Loader /> : (
        <>
          <time className="panel-hour__date" dateTime={time}>{time}</time>
          <img
            className="panel-hour__image"
            src={icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''}
            alt={description}
          />
          <div className="panel-hour__temperature">{temperature}°C</div>
        </>
      )}
    </article>
  );
}
