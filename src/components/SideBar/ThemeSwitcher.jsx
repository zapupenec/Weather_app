import React from "react";
import { useThemeSwitcher } from "../../hooks";

export function ThemeSwitcher() {
  const { darkModeState, handlerDarkMode } = useThemeSwitcher();

  const checkboxClassName = [
    "theme-switcher__checkbox",
    darkModeState ? "theme-switcher__checkbox_dark" : "",
  ].join(" ").trim();

  return (
    <button className="theme-switcher" onClick={handlerDarkMode(!darkModeState)}>
      <span className={checkboxClassName}></span>
    </button>
  );
}
