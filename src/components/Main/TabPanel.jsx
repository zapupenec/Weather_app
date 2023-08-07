import React from "react";

export function TabPanel({ activeTabId, id, children }) {
  const tabClassName = [
    id === activeTabId ? "tabpanel_shown" : "tabpanel",
  ].join(" ").trim();

  return (
    <div
      className={tabClassName}
      role="tabpanel"
      aria-labelledby={id}
    >{children}</div>
  );
}
