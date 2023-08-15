import React from "react";

export function TabPanel({ activeTabId, id, children }) {
  return (
    <div
      className="tabpanel_shown"
      role="tabpanel"
      aria-labelledby={id}
    >{children}</div>
  );
}
