import React from "react";
import { SideBar, Main } from "./components";
import { WeatherAppProvider } from "./contexts";

export function App() {
  return (
    <div className="app">
      <div className="container">
        <WeatherAppProvider>
          <SideBar />
          <Main />
        </WeatherAppProvider>
      </div>
    </div>
  );
}

