import { useCallback, useEffect, useRef } from "react";

export const useTimeout = (_callback: () => void, delay?: number) => {
  const callbackRef = useRef(_callback);
  const callback = callbackRef.current;

  const timerRef = useRef<NodeJS.Timeout>();

  const setTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);

  const clear = useCallback(() => {
    timerRef.current && clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (!delay) return;

    setTimer();

    return () => {
      clear();
    };
  }, [callback, clear, delay, setTimer]);

  return { clear };
};
