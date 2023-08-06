import React from "react";

function TabPanel({ activeTabId, id, children }) {
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

export default TabPanel;
