import React from "react";

function Swiper({ children }) {
  return (
    <div className="swiper">
      <button className="swiper__button swiper__button_left button-arrow"></button>
      <ul className="swiper__items">
        {children}
      </ul>
      <button className="swiper__button swiper__button_right button-arrow button-arrow_active"></button>
    </div>
  );
}

export default Swiper;
