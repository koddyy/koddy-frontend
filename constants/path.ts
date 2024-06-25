export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUP_MENTOR: "/signup/mentor",
  SIGNUP_MENTEE: "/signup/mentee",
  PROFILE_MENTOR: "/profile/mentor",
  PROFILE_MENTEE: "/profile/mentee",
  COFFEECHAT: "/coffeechat",
  COFFEECHAT_SUGGEST: "/coffeechat/suggested",
  SCHEDULE: "/schedule",
  NOTIFICATION: "/notification",
  MYPAGE: "/mypage",
  MYPAGE_ACCOUNT: "/mypage/account",
  MYPAGE_LOCALES: "/mypage/locales",
  MYPAGE_PROFILE_COMPLETE: "/mypage/profile/complete",
  MYPAGE_PROFILE_EDIT: "/mypage/profile/edit",
  MYPAGE_PROFILE_LANGUAGE: "/mypage/profile/language",
  MYPAGE_SCHEDULE: "/mypage/schedule",
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

export const PRIVATE_PATH = [
  PATH.SCHEDULE,
  PATH.MYPAGE_ACCOUNT,
  PATH.MYPAGE_LOCALES,
  PATH.MYPAGE_PROFILE_COMPLETE,
  PATH.MYPAGE_PROFILE_EDIT,
  PATH.MYPAGE_PROFILE_LANGUAGE,
  PATH.MYPAGE_SCHEDULE,
];
