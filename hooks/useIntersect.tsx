import { useCallback, useEffect, useRef } from "react";

export interface UseIntersectProps {
  onIntersect: () => void;
  options?: IntersectionObserverInit;
}

export const useIntersect = <T extends HTMLElement = HTMLDivElement>(
  onIntersect: () => void,
  options: IntersectionObserverInit = { rootMargin: "50px 0px" }
) => {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);

  const callback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!entry.isIntersecting) return;
      onIntersect();
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, optionsRef.current);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback, ref]);

  return ref;
};
