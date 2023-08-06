import React, { useState } from "react";
import { SideBar, Main } from ".";
import { forecastContext } from "./contexts";
import forecast from "./contexts/mock";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handlerDarkMode = () => setDarkMode(!darkMode);

  const classNameApp = [
    "app",
    darkMode ? `dark-mode` : "",
  ].join(" ").trim();

  return (
    <div className={classNameApp}>
      <div className="container">
        <forecastContext.Provider value={{ forecast }}>
          <SideBar darkModeContext={{ darkMode, handlerDarkMode }} />
          <Main />
        </forecastContext.Provider>
      </div>
    </div>
  );
}

export default App;
