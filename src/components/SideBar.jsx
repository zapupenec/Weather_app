import React, { useRef, useState, useContext } from "react";
import { Button, SearchPanel, ThemeSwitcher } from "../components";
import { forecastContext } from "./contexts";
import getDisplayForecastDay from "../getDisplayDate";

function SideBar({darkModeContext}) {
  const [searchPanelState, setSearchPanelState] = useState('hidden');
  const searchFieldRef = useRef();

  const toggleSearchPanelState = (state) => () => {
    setSearchPanelState(state);
    searchFieldRef.current.focus();
  };

  const { forecast } = useContext(forecastContext);
  const {
    date,
    description,
    temperature,
    feeling,
  } = forecast.today;

  const {
    datatime,
    dateDisplay,
  } = getDisplayForecastDay(date);

  return (
    <section className="side-bar">
      <SearchPanel state={searchPanelState} setState={toggleSearchPanelState} block="side-bar" searchFieldRef={searchFieldRef} />
      <div className="side-bar__buttons-row">
        <Button type="button" onClick={toggleSearchPanelState('shown')}>Поиск города</Button>
        <ThemeSwitcher darkModeContext={darkModeContext} />
      </div>
      <div className="side-bar__bgWeather">
        <img className="side-bar__imageWeather" src="./image/snowflake.svg" alt="snowflake.svg" />
      </div>
      <p className="side-bar__temperature">{temperature} <span className="side-bar__celsius">°C</span></p>
      <p className="side-bar__description">{description}</p>
      <p className="side-bar__feeling">Ощущается как {feeling} °C</p>
      <div className="side-bar__today">
        <p>Сегодня</p>
        <time dateTime={datatime}>{dateDisplay}</time>
      </div>
      <p className="side-bar__location">Москва</p>
    </section>
  );
}

export default SideBar;
