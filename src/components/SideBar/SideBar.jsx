import React, { useContext, useRef, useState } from "react";
import { Button, SearchPanel, ThemeSwitcher } from ".";
import { forecastContext } from "../../contexts";
import getDisplayForecastDay from "../../support/getDisplayDate";

export function SideBar() {
  const [searchPanelState, setSearchPanelState] = useState('hidden');
  const searchInputRef = useRef();
  const handlerSearchPanelState = (state) => () => {
    setSearchPanelState(state);
    if (state === 'shown') {
      searchInputRef.current.focus();
    }
  };
 
  const [activeCity, setActiveCity] = useState('Москва');
  const handlerActiveCity = (city) => () => {
    setActiveCity(city);
    handlerSearchPanelState('hidden')();
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
      <SearchPanel
        block="side-bar"
        activeCity={activeCity}
        handlerActiveCity={handlerActiveCity}
        searchPanelState={searchPanelState}
        handlerSearchPanelState={handlerSearchPanelState}
        searchInputRef={searchInputRef}
      />
      <div className="side-bar__buttons-row">
        <Button type="button" onClick={handlerSearchPanelState('shown')}>Поиск города</Button>
        <ThemeSwitcher />
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
      <p className="side-bar__location">{activeCity}</p>
    </section>
  );
}
