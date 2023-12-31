import { GetCoffeeChatListResponse } from "@/apis/coffeechat/types";
import { menteeList, mentorList } from "./user";

export const coffeechatList: GetCoffeeChatListResponse = [
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
    status: "CANCEL",
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
