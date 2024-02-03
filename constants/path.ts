export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUP_MENTOR: "/signup/mentor",
  SIGNUP_MENTEE: "/signup/mentee",
  NEWCOMER: "/newcomer",
  PROFILE_MENTOR: "/profile/mentor",
  PROFILE_MENTEE: "/profile/mentee",
  COFFEECHAT: "/coffeechat",
  SCHEDULE: "/schedule",
  NOTIFICATION: "/notification",
  MYPAGE: "/mypage",
  MYPAGE_ACCOUNT: "/mypage/account",
  MYPAGE_EDIT: "/edit",
  EXPLORE: "/explore",
};

export const PUBLIC_PATH = [
  PATH.HOME,
  PATH.LOGIN,
  PATH.SIGNUP,
  PATH.SIGNUP_MENTOR,
  PATH.SIGNUP_MENTEE,
  PATH.PROFILE_MENTOR,
  PATH.PROFILE_MENTEE,
  PATH.NOTIFICATION,
  PATH.MYPAGE,
  PATH.EXPLORE,
];

export const PRIVATE_PATH = [
  PATH.NEWCOMER, //
  PATH.COFFEECHAT,
  PATH.SCHEDULE,
  PATH.MYPAGE_EDIT,
];
