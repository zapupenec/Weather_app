import React, { useContext } from "react";

import { forecastContext } from "./contexts";

function PanelExtra({ type, size }) {
  const { forecast } = useContext(forecastContext);
  const {
    wind,
    directionWind,
    humidity,
    visibility,
    pressure,
  } = forecast.today;

  const panelExtraClassName = [
    "panel-extra",
    size ? `panel-extra_size_${size}` : "",
  ].join(" ").trim();

  const getBodyPanelExtra = (typePanelExtra) => {
    switch (typePanelExtra) {
      case "wind":
        return (
          <>
            <p className="panel-extra__title">Скорость ветра</p>
            <p className="panel-extra__info">{wind} <span className="panel-extra__measure">м/с</span></p>
            <div className="panel-extra__direction-wind panel-extra__direction-wind_northwestern">{directionWind}</div>
          </>
        );
      case "humidity":
        return (
          <>
            <p className="panel-extra__title">Влажность</p>
            <p className="panel-extra__info">{humidity} <span className="panel-extra__measure">%</span></p>
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
        throw new Error(`Unkhonw type PanelExtra: "${type}"`);
    }
  };

  return (
    <div className={panelExtraClassName}>
      {getBodyPanelExtra(type)}
    </div>
  );
}

export default PanelExtra;
