import React, { useState } from "react";
import { Tab, TabPanel } from ".";

export function Tabs({ tabNames, children }) {
  const [activeTabId, setActiveTabId] = useState("days");

  const handlerClick = (currentId) => () => setActiveTabId(currentId);

  return (
    <div className="tabs">
      <div className="tabs__header">
        <h1 className="tabs__title">Прогноз</h1>
        <nav className="tabs__nav">
          {React.Children.map(children, (child) => {
            return <Tab tabContext={{ activeTabId, handlerClick }} id={child.key}>{tabNames[child.key]}</Tab>
          })}
        </nav>
      </div>

      {React.Children.map(children, (child) => {
        return <TabPanel activeTabId={activeTabId} id={child.key}>{child}</TabPanel>
      })}
    </div>
  );
}
