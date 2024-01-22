import { GetCoffeeChatListResponse } from "@/apis/coffeechat/types";

/** deprecated */
export const mentor = {
  userId: "1",
  name: "김멘토",
  email: "mentor@gmail.com",
  school: "멘토대학교",
  major: "멘토학부",
  nationality: "한국인",
  languages: [{ languageId: "KR" }, { languageId: "EN" }],
  introduce: "안녕하세요 저는 멘토대학교에 다니는 김멘토라고 합니다",
  mentorYn: "Y",
  grade: 1,
  availableTimes: [
    { week: "MON", startTime: "17:00", endTime: "20:00" },
    { week: "TUE", startTime: "17:00", endTime: "20:00" },
    { week: "WED", startTime: "17:00", endTime: "20:00" },
  ],
};

export const mentee = {
  userId: "11",
  name: "Hường",
  email: "mentee@gmail.com",
  school: "멘티대학교",
  major: "멘티학부",
  nationality: "베트남인",
  languages: [{ languageId: "VN" }, { languageId: "KR" }, { languageId: "EN" }],
  introduce:
    "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
  mentorYn: "N",
};

export const mentorList = new Array(10)
  .fill(mentor)
  .map((v, i) => ({ ...v, userId: `${i + 1}`, name: `멘토${i + 1}` }));

export const menteeList = new Array(10)
  .fill(mentee)
  .map((v, i) => ({ ...v, userId: `${(i + 1) * 10}`, name: `멘티${(i + 1) * 10}` }));

export const depreactedCoffeeChatList: GetCoffeeChatListResponse = [
  {
    applicationId: "1",
    mentee: menteeList[0],
    mentor: mentorList[0],
    status: "AGREE",
    date: "2024-01-01",
    startTime: "17:00",
    endTime: "20:00",
    question: "안녕하세요",
  },
  {
    applicationId: "2",
    mentee: menteeList[1],
    mentor: mentorList[1],
    status: "REQUEST",
    date: "2024-01-01",
    startTime: "17:00",
    endTime: "20:00",
    question: "안녕하세요",
  },
  {
    applicationId: "3",
    mentee: menteeList[2],
    mentor: mentorList[2],
    status: "SUGGEST",
    date: "2024-01-01",
    startTime: "17:00",
    endTime: "20:00",
    question: "안녕하세요",
  },
  {
    applicationId: "4",
    mentee: menteeList[3],
    mentor: mentorList[3],
    status: "SUGGEST",
    date: "2024-01-01",
    startTime: "17:00",
    endTime: "20:00",
    question: "안녕하세요",
  },
  {
    applicationId: "5",
    mentee: menteeList[4],
    mentor: mentorList[4],
    status: "DONE",
    date: "2024-01-01",
    startTime: "17:00",
    endTime: "20:00",
    question: "안녕하세요",
  },
];
