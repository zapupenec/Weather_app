import React from "react";

export function SearchHistory({ history, activeCity, handlerActiveCity }) {
  const searchHistoryClassName = [
    "search-history",
  ].join(" ").trim();

  return (
    <div className={searchHistoryClassName}>
      {history.map((log, i) => (
        <p
          key={`log_${history.length + i + 1}`}
          className={`search-history__item${log === activeCity ? " search-history__item_active" : ""}`}
          onClick={handlerActiveCity(log)}
        >{log}</p>
      ))}
    </div>
  );
}
