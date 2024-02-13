import { menteeList, mentorList } from "./user";

export const coffeeChatWithMenteeList = [
  {
    id: 1,
    status: "APPLY",
    applyReason:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    suggestReason: null,
    question: null,
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: null,
    chatValue: null,
  },
  {
    id: 2,
    status: "SUGGEST",
    applyReason: null,
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question: null,
    rejectReason: null,
    start: null,
    end: null,
    chatType: null,
    chatValue: null,
  },
  {
    id: 3,
    status: "APPROVE",
    applyReason:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question: null,
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: "zoom",
    chatValue: "https://us05web.zoom.us/mock-url",
  },
  {
    id: 4,
    status: "PENDING",
    applyReason: null,
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: null,
    chatValue: null,
  },
  {
    id: 5,
    status: "COMPLETE",
    applyReason:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question: null,
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: null,
    chatValue: null,
  },
  {
    id: 5,
    status: "COMPLETE",
    applyReason: "신청..",
    question: "질문..",
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: null,
    chatValue: null,
  },
  {
    id: 6,
    status: "CANCEL,REJECT",
    applyReason:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question: null,
    rejectReason: "스케줄이 바뀌었어요.",
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: null,
    chatValue: null,
  },
];

export const coffeeChatWithMentorList = [
  {
    id: 1,
    status: "APPLY",
    applyReason:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    question: null,
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: null,
    chatValue: null,
  },
  {
    id: 2,
    status: "SUGGEST",
    applyReason: null,
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question: null,
    rejectReason: null,
    start: null,
    end: null,
    chatType: null,
    chatValue: null,
  },
  {
    id: 3,
    status: "APPROVE",
    applyReason:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question: null,
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: "zoom",
    chatValue: "https://us05web.zoom.us/",
  },
  {
    id: 4,
    status: "PENDING",
    applyReason: null,
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: null,
    chatValue: null,
  },
  {
    id: 5,
    status: "COMPLETE",
    applyReason:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question: null,
    rejectReason: null,
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: "zoom",
    chatValue: "https://us05web.zoom.us/",
  },
  {
    id: 6,
    status: "CANCEL,REJECT",
    applyReason:
      "안녕하세요, 한국을 좋아하는 학생입니다. 서울대 철학과 편입을 목표로 한국어 공부 및 유학 준비를 하고 있습니다. 한국어, 영어, 베트남어로 대화가 가능합니다! 합격 서류에 대한 자기소개서 질문이 많아요.",
    suggestReason:
      "안녕하세요. 저도 외국에 유학 경험이 있어요. 타지에서의 생활과 도전, 장점 등을 어떻게 극복했는지 이야기 해보고 싶어요.",
    question: null,
    rejectReason: "스케줄이 바뀌었어요.",
    start: "2024-01-01T20:00:00",
    end: "2024-01-01T20:30:00",
    chatType: "zoom",
    chatValue: "https://us05web.zoom.us/",
  },
];

export const appliedCoffeeChatList = [
  {
    coffeeChatId: 1,
    name: "멘티1",
    profileImageUrl: "",
    nationality: "EN",
    interestSchool: "서울대학교",
    interestMajor: "컴퓨터공학부",
  },
  {
    coffeeChatId: 2,
    name: "멘티2",
    profileImageUrl: "",
    nationality: "JP",
    interestSchool: "연세대학교",
    interestMajor: "컴퓨터공학부",
  },
  {
    coffeeChatId: 3,
    name: "멘티3",
    profileImageUrl: "",
    nationality: "CN",
    interestSchool: "고려대학교",
    interestMajor: "컴퓨터공학부",
  },
  {
    coffeeChatId: 4,
    name: "멘티4",
    profileImageUrl: "",
    nationality: "EN",
    interestSchool: "OO대학교",
    interestMajor: "OO학부",
  },
  {
    coffeeChatId: 5,
    name: "멘티5",
    profileImageUrl: "",
    nationality: "VN",
    interestSchool: "OO대학교",
    interestMajor: "OO학부",
  },
];

export const suggestedCoffeeChatList = [
  {
    coffeeChatId: 1,
    name: "멘토1",
    profileImageUrl: "",
    school: "서울대학교",
    major: "컴퓨터공학부",
    enteredIn: 17,
  },
  {
    coffeeChatId: 2,
    name: "멘토2",
    profileImageUrl: "",
    school: "연세대학교",
    major: "컴퓨터공학부",
    enteredIn: 18,
  },
  {
    coffeeChatId: 3,
    name: "멘토3",
    profileImageUrl: "",
    school: "고려대학교",
    major: "컴퓨터공학부",
    enteredIn: 19,
  },
  {
    coffeeChatId: 4,
    name: "멘토4",
    profileImageUrl: "",
    school: "OO대학교",
    major: "OO학부",
    enteredIn: 20,
  },
  {
    coffeeChatId: 4,
    name: "멘토5",
    profileImageUrl: "",
    school: "OO대학교",
    major: "OO학부",
    enteredIn: 21,
  },
];

/** deprecated */

export const depreactedCoffeeChatList = [
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
    status: "DONE",
    date: "2024-01-01",
    startTime: "17:00",
    endTime: "20:00",
    question: "안녕하세요",
  },
  {
    applicationId: "5",
    mentee: menteeList[4],
    mentor: mentorList[4],
    status: "CANCEL",
    date: "2024-01-01",
    startTime: "17:00",
    endTime: "20:00",
    question: "안녕하세요",
  },
];
