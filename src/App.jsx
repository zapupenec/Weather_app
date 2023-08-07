import React from "react";
import { SideBar, Main } from "./components";
import { forecastContext } from "./contexts";
import forecast from "./contexts/mock";

export function App() {
  return (
    <div className="app">
      <div className="container">
        <forecastContext.Provider value={{ forecast }}>
          <SideBar />
          <Main />
        </forecastContext.Provider>
      </div>
    </div>
  );
}

