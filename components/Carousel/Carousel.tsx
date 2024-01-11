/* eslint-disable tailwindcss/no-custom-classname */
import "keen-slider/keen-slider.min.css";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import { Children, cloneElement, ReactElement, useState } from "react";
import { cn } from "@/utils/cn";

interface AutoSwitchOptions {
  autoSwitch?: boolean;
  autoSwitchInterval?: number;
}

interface CarouselProps extends KeenSliderOptions, AutoSwitchOptions {
  animationDuration?: number;
  children: ReactElement[];
}

export const Carousel = ({
  children,
  autoSwitch = false,
  autoSwitchInterval = 3000,
  animationDuration = 2000,
  ...options
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(options.initial ?? 0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
      defaultAnimation: {
        duration: animationDuration,
      },
      ...options,
    },
    autoSwitch
      ? [
          (slider) => {
            let timeout: NodeJS.Timeout;
            let mouseOver = false;
            function clearNextTimeout() {
              clearTimeout(timeout);
            }
            function nextTimeout() {
              clearTimeout(timeout);
              if (mouseOver) return;
              timeout = setTimeout(() => {
                slider.next();
              }, autoSwitchInterval);
            }
            slider.on("created", () => {
              slider.container.addEventListener("mouseover", () => {
                mouseOver = true;
                clearNextTimeout();
              });
              slider.container.addEventListener("mouseout", () => {
                mouseOver = false;
                nextTimeout();
              });
              nextTimeout();
            });
            slider.on("dragStarted", clearNextTimeout);
            slider.on("animationEnded", nextTimeout);
            slider.on("updated", nextTimeout);
          },
        ]
      : undefined
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {Children.map(children, (child, i) =>
          cloneElement(child, {
            key: i,
            className: cn(child.props.className, "keen-slider__slide min-w-full"),
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
