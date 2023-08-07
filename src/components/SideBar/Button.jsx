import React from "react";

export function Button({ block, size, type, onClick, children }) {
  const className = [
    block ? `${block}__button` : "",
    "button",
    size ? `button_size_${size}` : "",
  ].join(" ").trim();

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
