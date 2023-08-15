import { useEffect, useRef, useState } from "react";

export function Swiper({ children }) {
  const [shownItemsCount, setShownItemsCount] = useState(0);
  const [curentIndex, setCurrentIndex] = useState(0);
  const [widthList, setWidthList] = useState(0);

  const listRef = useRef();
  const widthItem = 100;

  const handlePrev = () => {
    if (curentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  }

  const handleNext = () => {
    if (curentIndex >= children.length - shownItemsCount) return;
    setCurrentIndex((prev) => prev + 1);
  }

  useEffect(() => {
    const resizeHandler = () => {
      const newWidthList = listRef.current.clientWidth;
      if (newWidthList > widthList && curentIndex !== 0 && curentIndex === children.length - shownItemsCount) {
        setCurrentIndex((prev) => prev - 1);
      }
      setWidthList(newWidthList);
      if (window.matchMedia('(max-width: 833px)').matches) {
        setCurrentIndex(0);
        setShownItemsCount(children.length);
        return;
      }
      const styleItemsEl = window.getComputedStyle(listRef.current)

      const gap = Number(`${styleItemsEl.gap}`.replace(/[^0-9]/g, ""));
      const itemsCount = Math.floor((widthList + gap) / (widthItem + gap));

      setShownItemsCount(itemsCount);
    };
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  const classNameBtnPrev = [
    "swiper__button",
    "swiper__button_prev",
    "button-arrow",
    curentIndex === 0 ? "" : "button-arrow_active",
  ].join(" ").trim();

  const classNameBtnNext = [
    "swiper__button",
    "swiper__button_next",
    "button-arrow",
    curentIndex >= children.length - shownItemsCount ? "" : "button-arrow_active",
  ].join(" ").trim();

  return (
    <div className="swiper">
      <button className={classNameBtnPrev} aria-label="назад" onClick={handlePrev}></button>
      <div className="swiper__items" ref={listRef}>
        {children.filter((child, i) => i >= curentIndex && i < curentIndex + shownItemsCount)}
      </div>
      <button className={classNameBtnNext} aria-label="вперед" onClick={handleNext}></button>
    </div>
  );
}
