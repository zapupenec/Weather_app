import React from "react";

function ThemeSwitcher({darkModeContext}) {
  const checkboxClassName = [
    "theme-switcher__checkbox",
    darkModeContext.darkMode ? `theme-switcher__checkbox_dark` : "",
  ].join(" ").trim();

  return (
    <button className="theme-switcher" onClick={darkModeContext.handlerDarkMode} id="theme-switcher">
      <span className={checkboxClassName}></span>
    </button>
  );
}

export default ThemeSwitcher;
