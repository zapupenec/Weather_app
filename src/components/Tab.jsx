import React from "react";

function Tab({ tabContext, id, children }) {
  const { activeTabId, handlerClick } = tabContext;

  const tabClassName = [
    "tabs__button",
    id === activeTabId ? "tabs__button_active" : "",
  ].join(" ").trim();

  return (
    <button
      className={tabClassName}
      role="tab"
      aria-controls={id}
      onClick={handlerClick(id)}
    >{children}</button>
  );
}

export default Tab;
