import React from "react";
import { SideBar, Main } from "./components";
import { WeatherAppProvider } from "./contexts";
import "./styles/app.css"

export function App() {
  return (
    <div className="app">
        <WeatherAppProvider>
          <SideBar />
          <Main />
        </WeatherAppProvider>
    </div>
  );
}
