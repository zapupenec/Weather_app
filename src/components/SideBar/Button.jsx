import React from "react";

export function Button({ block, size, type, onClick, children, btnSubmitRef }) {
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
      ref={btnSubmitRef}
    >
      {children}
    </button>
  );
}
