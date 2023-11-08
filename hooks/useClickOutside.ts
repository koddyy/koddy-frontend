import { RefObject, useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  onClickOutside: () => void
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const el = ref.current;
      if (!el || (e.target instanceof HTMLElement && ref.current.contains(e.target))) return;
      onClickOutside();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return ref;
};

export default useClickOutside;
