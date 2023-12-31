import React from "react";

export function Tab({ tabContext, id, children }) {
  const { activeTabId, handleClick } = tabContext;

  const tabClassName = [
    "tabs__button",
    id === activeTabId ? "tabs__button_active" : "",
  ].join(" ").trim();

  return (
    <button
      className={tabClassName}
      role="tab"
      aria-controls={id}
      onClick={handleClick(id)}
    >{children}</button>
  );
}
