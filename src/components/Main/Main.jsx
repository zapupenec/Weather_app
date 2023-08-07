import React, { useContext } from "react";
import { Tabs, Swiper, PanelDay, PanelExtra, PanelHour } from ".";
import { forecastContext } from "../../contexts";

export function Main() {
  const { forecast } = useContext(forecastContext);
  const { today, days, hours } = forecast;

  return (
    <main className="main">
      <Tabs tabNames={{ days: "на неделю", hours: "почасовой" }}>
        <Swiper key="days">
          {days.map((forecastDay, i) => <PanelDay key={i} today={today} forecastDay={forecastDay} />)}
        </Swiper>

        <Swiper key="hours">
          {hours.map((forecastHour, i) => <PanelHour key={i} forecastHour={forecastHour} />)}
        </Swiper>
      </Tabs>

      <div className="today-panels">
        <h1 className="today-panels__title">Подробно на сегодня</h1>
        <div className="today-panels__group">
          <PanelExtra type="wind" />
          <PanelExtra type="humidity" />
        </div>
        <div className="today-panels__group">
          <PanelExtra type="visibility" size="small" />
          <PanelExtra type="pressure" size="small" />
        </div>
      </div>
    </main>
  );
}
