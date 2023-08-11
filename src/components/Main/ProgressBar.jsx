import React from "react";

export function ProgressBar({ value }) {
  const className = [
    "progress-bar",
  ].join(" ").trim();

  return (
    <div className={className}>
      <div className="progrss-bar__points">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <progress className="progress-bar__scale" value={value} max="100" />
      <span className="progress-bar__measure">%</span>
    </div>
  );
}
