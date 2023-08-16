import React, { useContext } from "react";
import { WeatherAppContext } from "../../contexts";
import { Loader } from '..';
import { ProgressBar } from ".";

const getBodyPanelExtra = (typePanelExtra, forecast) => {
  const {
    wind,
    humidity,
    visibility,
    pressure,
  } = forecast.main;

  switch (typePanelExtra) {
    case "wind":
      return (
        <>
          <p className="panel-extra__title">Скорость ветра</p>
          <p className="panel-extra__info">{wind.speed} <span className="panel-extra__measure">м/с</span></p>
          <div className="panel-extra__direction-wind">
            <div
              className={`panel-extra__wind-indicator`}
              style={{
                transform: `rotate(${wind.deg}deg)`,
              }}
            />
            <span>{wind.description}</span>
          </div>
        </>
      );
    case "humidity":
      return (
        <>
          <p className="panel-extra__title">Влажность</p>
          <p className="panel-extra__info">{humidity} <span className="panel-extra__measure">%</span></p>
          <ProgressBar value={humidity} />
        </>
      );
    case "visibility":
      return (
        <>
          <p className="panel-extra__title">Видимость</p>
          <p className="panel-extra__info">{visibility} <span className="panel-extra__measure">км</span></p>
        </>
      );
    case "pressure":
      return (
        <>
          <p className="panel-extra__title">Давление</p>
          <p className="panel-extra__info">{pressure} <span className="panel-extra__measure panel-extra__measure_size_small">мм рт.ст.</span></p>
        </>
      );
    default:
      throw new Error(`Unkhonw type PanelExtra: "${typePanelExtra}"`);
  }
};

export function PanelExtra({ type, size }) {
  const { forecast, processState } = useContext(WeatherAppContext);

  const panelExtraClassName = [
    "panel-extra",
    size ? `panel-extra_size_${size}` : "",
  ].join(" ").trim();

  return (
    <article className={panelExtraClassName}>
      {processState !== 'filling' ? <Loader /> : getBodyPanelExtra(type, forecast)}
    </article>
  );
}
