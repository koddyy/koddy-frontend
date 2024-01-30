import { getCookie, setCookie } from "cookies-next";

export const timezoneCookie = {
  cookieKey: "timezone",

  get() {
    const timezone = getCookie(this.cookieKey);

    if (!timezone) {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    return timezone;
  },

  set(timezone: string) {
    setCookie(this.cookieKey, timezone);
  },
};
