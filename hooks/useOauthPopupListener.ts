import { useEffect, useState } from "react";

export const useOauthPopupListener = () => {
  const [authCodeAndState, setAuthCodeAndState] = useState({ code: "", state: "" });

  useEffect(() => {
    const oauthPopupListener = (e: MessageEvent) => {
      const { code, state } = e.data;
      if (code && state) {
        setAuthCodeAndState({ code, state });
      }
    };

    window.addEventListener("message", oauthPopupListener);

    return () => {
      window.removeEventListener("message", oauthPopupListener);
    };
  }, []);

  const { code, state } = authCodeAndState;

  return { code, state };
};
