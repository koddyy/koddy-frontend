import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const authCookie = {
  cookieKey: "access_token",
  maxAge: 60 * 60 * 24 * 14 + 60,

  get() {
    const accessToken = getCookie(this.cookieKey);

    return accessToken;
  },

  set(accessToken: string) {
    setCookie(this.cookieKey, accessToken, {
      maxAge: this.maxAge,
    });
  },

  clear() {
    deleteCookie(this.cookieKey);
  },
};
