/* eslint-disable tailwindcss/no-custom-classname */
import "./Wheel.css";
import { TrackDetails, useKeenSlider } from "keen-slider/react";
import { useEffect, useRef, useState } from "react";

const wheelSize = 15;
const slideDgree = 360 / wheelSize;

interface WheelProps<T> {
  items: T[];
  onChangeItemIndex?: (index: number) => void;
  loop?: boolean;
  initialIndex?: number;
}

export const Wheel = <T extends string | number>({
  items,
  onChangeItemIndex,
  loop,
  initialIndex = 0,
}: WheelProps<T>) => {
  const size = useRef(0);
  const slidesPerView = loop ? 9 : 1;

  const [sliderState, setSliderState] = useState<TrackDetails>();
  const [sliderRef, sliderInstanceRef] = useKeenSlider({
    slides: {
      number: items.length,
      origin: loop ? "center" : "auto",
      perView: slidesPerView,
    },
    initial: initialIndex,
    vertical: true,
    loop,
    rubberband: !loop,
    mode: "free-snap",
    dragSpeed: (val) => {
      const height = size.current;
      return (
        val * (height / ((height / 2) * Math.tan(slideDgree * (Math.PI / 180))) / slidesPerView)
      );
    },
    created: (s) => {
      size.current = s.size;
    },
    updated: (s) => {
      size.current = s.size;
    },
    detailsChanged: (s) => {
      setSliderState(s.track.details);
    },
    slideChanged: (s) => {
      onChangeItemIndex?.(s.track.details.abs);
    },
  });

  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (sliderInstanceRef.current) setRadius(sliderInstanceRef.current.size / 2);
  }, [sliderInstanceRef]);

  const getSlideStyles = () => {
    if (!sliderState) return [];
    const offset = loop ? (1 - 1 / slidesPerView) / 2 : 0;

    const styles = [];
    for (let i = 0; i < sliderState.length + 1; i++) {
      const distance = (sliderState.slides[i].distance - offset) * slidesPerView;
      const rotate = Math.abs(distance) > wheelSize / 2 ? 180 : distance * (360 / wheelSize) * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };
      styles.push(style);
    }
    return styles;
  };

  return (
    <div className="wheel" ref={sliderRef}>
      <div className="wheel__shadow-top" />
      <div className="wheel__inner">
        <div className="wheel__slides">
          {getSlideStyles().map((style, idx) => (
            <div className="wheel__slide" style={style} key={idx}>
              <span>{items[idx]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="wheel__shadow-bottom" />
    </div>
  );
};
