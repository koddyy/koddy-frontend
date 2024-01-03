import { Mentee, Mentor } from "@/types/user";

export const mentor: Mentor = {
  userId: "1",
  name: "김멘토",
  email: "mentor@gmail.com",
  school: "멘토대학교",
  major: "멘토학부",
  nationality: "한국인",
  languages: [{ languageId: "KO" }, { languageId: "EN" }],
  introduce: "안녕하세요 저는 멘토대학교에 다니는 김멘토라고 합니다",
  mentorYn: "Y",
  grade: 1,
  availableTimes: [
    { week: "MON", startTime: "17:00", endTime: "20:00" },
    { week: "TUE", startTime: "17:00", endTime: "20:00" },
    { week: "WED", startTime: "17:00", endTime: "20:00" },
  ],
};

export const mentee: Mentee = {
  userId: "11",
  name: "Hường",
  email: "mentee@gmail.com",
  school: "멘티대학교",
  major: "멘티학부",
  nationality: "베트남인",
  languages: [{ languageId: "VI" }, { languageId: "KO" }, { languageId: "EN" }],
  introduce:
    "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
  mentorYn: "N",
};

export const mentorList: Mentor[] = new Array(10)
  .fill(mentor)
  .map((v, i) => ({ ...v, userId: `${i + 1}`, name: `멘토${i + 1}` }));

export const menteeList: Mentee[] = new Array(10)
  .fill(mentee)
  .map((v, i) => ({ ...v, userId: `${(i + 1) * 10}`, name: `멘티${(i + 1) * 10}` }));

export const userList = [...mentorList, ...menteeList];
