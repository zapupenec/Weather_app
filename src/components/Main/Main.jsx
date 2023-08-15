import React, { useContext } from "react";
import { Tabs, Swiper, PanelExtra, PanelDay, PanelHour } from ".";
import { WeatherAppContext } from "../../contexts";

export function Main() {
  const { forecast } = useContext(WeatherAppContext);
  const { date, days, hours } = forecast;

  return (
    <main className="main">
      <div className="main__wrapper">
        <Tabs tabNames={{ days: "на неделю", hours: "почасовой" }}>
          <Swiper key="days">
            {days.map((forecastDay, i) => <PanelDay key={i} date={date} forecastDay={forecastDay} />)}
          </Swiper>
          <Swiper key="hours">
            {hours.map((forecastHour, i) => <PanelHour key={i} forecastHour={forecastHour} />)}
          </Swiper>
        </Tabs>

        <div className="today-panels">
          <h2 className="today-panels__title">Подробно на сегодня</h2>
          <div className="today-panels__group">
            <PanelExtra type="wind" />
            <PanelExtra type="humidity" />
          </div>
          <div className="today-panels__group">
            <PanelExtra type="visibility" size="small" />
            <PanelExtra type="pressure" size="small" />
          </div>
        </div>
      </div >
    </main >
  );
}
