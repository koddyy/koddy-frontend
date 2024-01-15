export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUP_MENTOR: "/signup/mentor",
  SIGNUP_MENTEE: "/signup/mentee",
  NEWCOMER: "/newcomer",
  PROFILE: "/profile",
  COFFEECHAT: "/coffeechat",
  SCHEDULE: "/schedule",
  NOTIFICATION: "/notification",
  MYPAGE: "/mypage",
  MYPAGE_EDIT: "/mypage/edit",
};

export const PUBLIC_PATH = [
  PATH.HOME,
  PATH.LOGIN,
  PATH.SIGNUP,
  PATH.SIGNUP_MENTOR,
  PATH.SIGNUP_MENTEE,
  PATH.PROFILE,
  PATH.NOTIFICATION,
  PATH.MYPAGE,
];

export const PRIVATE_PATH = [
  PATH.NEWCOMER, //
  PATH.COFFEECHAT,
  PATH.SCHEDULE,
  PATH.MYPAGE_EDIT,
];
