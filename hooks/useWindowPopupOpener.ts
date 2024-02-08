import { useCallback, useEffect, useState } from "react";

export interface UseWindowPopup {
  width?: number;
  height?: number;
  closeMessage?: string;
  closePopupOnUnmount?: boolean;
}

export const useWindowPopupOpener = ({
  width = 500,
  height = 700,
  closeMessage,
  closePopupOnUnmount = true,
}: UseWindowPopup = {}) => {
  const [popup, setPopup] = useState<Window | null>(null);

  const openPopup = useCallback(
    (url: string) => {
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2.5;
      const popup = window.open(
        url,
        "_blank",
        `width=${width},height=${height},left=${left},top=${top}`
      );
      setPopup(popup);
    },
    [height, width]
  );

  const closePopup = useCallback(() => {
    popup?.close();
  }, [popup]);

  useEffect(() => {
    const popupListener = (e: MessageEvent) => {
      if (closeMessage && e.data === closeMessage) {
        closePopup();
      }
    };

    window.addEventListener("message", popupListener);

    return () => {
      window.removeEventListener("message", popupListener);

      if (closePopupOnUnmount) closePopup();
    };
  }, [closePopupOnUnmount, closePopup, closeMessage]);

  return { popup, openPopup, closePopup };
};
