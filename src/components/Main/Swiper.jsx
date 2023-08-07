import React from "react";

export function Swiper({ children }) {
  return (
    <div className="swiper">
      <button className="swiper__button swiper__button_left button-arrow"></button>
      <div className="swiper__items">
        {children}
      </div>
      <button className="swiper__button swiper__button_right button-arrow button-arrow_active"></button>
    </div>
  );
}
