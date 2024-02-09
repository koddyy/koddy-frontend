const messages = {
  ...(await import("./components.json")).default,
  ...(await import("./constants.json")).default,

  /** page */
  ...(await import("./coffeechat.json")).default,
  ...(await import("./home.json")).default,
  ...(await import("./login.json")).default,
  ...(await import("./signup.json")).default,
  ...(await import("./newcomer.json")).default,
};

export default messages;
