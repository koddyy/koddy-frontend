const messages = {
  ...(await import("./signup.json")).default,
  ...(await import("./newcomer.json")).default,
  ...(await import("./constants.json")).default,
};

export default messages;
