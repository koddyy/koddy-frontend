/* eslint-disable tailwindcss/no-custom-classname */
import "keen-slider/keen-slider.min.css";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import { Children, cloneElement, ReactElement, useState } from "react";
import { cn } from "@/utils/cn";

interface CarouselProps extends KeenSliderOptions {
  children: ReactElement[];
}

export const Carousel = ({ children, ...options }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(options.initial ?? 0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    ...options,
  });

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {Children.map(children, (child, i) =>
          cloneElement(child, {
            key: i,
            className: cn(child.props.className, "keen-slider__slide"),
          })
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="flex justify-center gap-[6px]">
          {[...Array(instanceRef.current?.track.details.slides.length).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={cn(
                "h-[8px] w-[8px] rounded-[4px] bg-gray-300 transition-all",
                currentSlide === idx && "w-[14px] bg-primary"
              )}
            ></button>
          ))}
        </div>
      )}
    </>
  );
};
