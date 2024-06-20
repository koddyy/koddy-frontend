import components from "./components.json";
import constants from "./constants.json";

import coffeechat from "./coffeechat.json";
import edit from "./edit.json";
import home from "./home.json";
import login from "./login.json";
import mypage from "./mypage.json";
import newcomer from "./newcomer.json";
import notification from "./notification.json";
import profile from "./profile.json";
import schedule from "./schedule.json";
import signup from "./signup.json";

const messages = {
  ...components,
  ...constants,

  /** page */
  ...coffeechat,
  ...edit,
  ...home,
  ...login,
  ...mypage,
  ...newcomer,
  ...notification,
  ...profile,
  ...schedule,
  ...signup,
};

export default messages;
