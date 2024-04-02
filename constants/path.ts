export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUP_MENTOR: "/signup/mentor",
  SIGNUP_MENTEE: "/signup/mentee",
  SETTINGS_COMPLETE: "/settings/complete",
  PROFILE_MENTOR: "/profile/mentor",
  PROFILE_MENTEE: "/profile/mentee",
  COFFEECHAT: "/coffeechat",
  COFFEECHAT_SUGGEST: "/coffeechat/suggested",
  SCHEDULE: "/schedule",
  NOTIFICATION: "/notification",
  MYPAGE: "/mypage",
  MYPAGE_ACCOUNT: "/mypage/account",
  SETTINGS: "/settings",
  SETTINGS_PROFILE: "/settings/profile",
  SETTINGS_LANGUAGE: "/settings/language",
  SETTINGS_LOCALES: "/settings/locales",
  SETTINGS_SCHEDULE: "/settings/schedule",
};

export const PUBLIC_PATH = [
  PATH.HOME,
  PATH.LOGIN,
  PATH.SIGNUP,
  PATH.SIGNUP_MENTOR,
  PATH.SIGNUP_MENTEE,
  PATH.PROFILE_MENTOR,
  PATH.PROFILE_MENTEE,
  PATH.COFFEECHAT,
  PATH.NOTIFICATION,
  PATH.MYPAGE,
];

export const PRIVATE_PATH = [PATH.SCHEDULE, PATH.SETTINGS];
