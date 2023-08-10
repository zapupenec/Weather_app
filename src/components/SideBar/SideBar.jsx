import { useContext } from "react";
import { Button, SearchPanel, ThemeSwitcher } from ".";
import { WeatherAppContext } from "../../contexts";
import { getDisplayForecastDay } from "../../support";
import { Loader } from "..";

export function SideBar() {
  const {
    formState,
    forecast,
    handleSearchPanelState,
    currentLocation,
  } = useContext(WeatherAppContext);

  const {
    date,
    main: {
      description,
      temperature,
      feeling,
      icon,
    }
  } = forecast;

  const {
    datatime,
    dateDisplay,
  } = getDisplayForecastDay(date);

  return (
    <section className="side-bar">
      <SearchPanel
        block="side-bar"
      />
      <div className="side-bar__buttons-row">
        <Button type="button" onClick={handleSearchPanelState('shown')}>Поиск города</Button>
        <ThemeSwitcher />
      </div>
      {formState === 'waiting' ? <Loader /> : (
        <>
          <div className="side-bar__bgWeather">
            <img
              className="side-bar__imageWeather"
              src={icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''}
              alt='иконка погоды'
            />
          </div>
          <p className="side-bar__temperature">{temperature} <span className="side-bar__celsius">°C</span></p>
          <p className="side-bar__description">{description}</p>
          <p className="side-bar__feeling">Ощущается как {feeling} °C</p>
          <div className="side-bar__today">
            <p>Сегодня</p>
            <time dateTime={datatime}>{dateDisplay}</time>
          </div>
          <p className="side-bar__location">{currentLocation.cityName}</p>
        </>
      )}
    </section>
  );
}
