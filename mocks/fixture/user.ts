import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";

export const mentor: Mentor = {
  id: 1,
  email: "mentor1@gmail.com",
  name: "멘토1",
  profileImageUrl: "s3/Mentor1.png",
  introduction: "Hello World~",
  languages: {
    main: "KR",
    sub: ["EN", "CN", "JP"],
  },
  school: "멘토대학교",
  major: "멘토학부",
  enteredIn: 18,
  period: {
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  schedules: [
    {
      dayOfWeek: "월",
      start: {
        hour: 9,
        minute: 0,
      },
      end: {
        hour: 17,
        minute: 0,
      },
    },
    {
      dayOfWeek: "수",
      start: {
        hour: 9,
        minute: 0,
      },
      end: {
        hour: 17,
        minute: 0,
      },
    },
    {
      dayOfWeek: "금",
      start: {
        hour: 9,
        minute: 0,
      },
      end: {
        hour: 17,
        minute: 0,
      },
    },
  ],
  role: "mentor",
  profileComplete: true,
};

export const mentee: Mentee = {
  id: 1,
  email: "mentee1@gmail.com",
  name: "멘티1",
  profileImageUrl: "s3/Mentee1.png",
  nationality: "EN",
  introduction: "Hello World~",
  languages: {
    main: "EN",
    sub: ["KR", "VN"],
  },
  interestSchool: "멘티대학교",
  interestMajor: "멘티학부",
  role: "mentee",
  profileComplete: true,
};

export const mentorList: Mentor[] = new Array(10)
  .fill(mentor)
  .map((v, i) => ({ ...v, id: i + 1, name: `멘토${i + 1}` }));

export const menteeList: Mentee[] = new Array(10)
  .fill(mentee)
  .map((v, i) => ({ ...v, id: (i + 1) * 10, name: `멘티${(i + 1) * 10}` }));

export const userList = [...mentorList, ...menteeList];
