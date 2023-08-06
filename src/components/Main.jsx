import React, { useContext } from "react";
import { Tabs, Swiper, PanelDay, PanelExtra, PanelHour } from "../components";
import { forecastContext } from "./contexts";

function Main() {
  const { forecast } = useContext(forecastContext);

  return (
    <main className="main">
      <Tabs tabNames={{ days: "на неделю", hours: "почасовой" }}>
        <Swiper key="days">
          <PanelDay today={forecast.today} forecastDay={forecast.days[0]}></PanelDay>
          <PanelDay today={forecast.today} forecastDay={forecast.days[1]}></PanelDay>
          <PanelDay today={forecast.today} forecastDay={forecast.days[2]}></PanelDay>
          <PanelDay today={forecast.today} forecastDay={forecast.days[3]}></PanelDay>
          <PanelDay today={forecast.today} forecastDay={forecast.days[4]}></PanelDay>
          <PanelDay today={forecast.today} forecastDay={forecast.days[5]}></PanelDay>
        </Swiper>

        <Swiper key="hours">
          <PanelHour forecastHour={forecast.hours[0]}></PanelHour>
          <PanelHour forecastHour={forecast.hours[1]}></PanelHour>
          <PanelHour forecastHour={forecast.hours[2]}></PanelHour>
          <PanelHour forecastHour={forecast.hours[3]}></PanelHour>
          <PanelHour forecastHour={forecast.hours[4]}></PanelHour>
          <PanelHour forecastHour={forecast.hours[5]}></PanelHour>
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

export default Main;
