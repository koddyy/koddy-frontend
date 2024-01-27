import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";
import { AvailableTimes, Nationality, NationCode } from "@/types/user";

export type GetMentorByIdResponse = Pick<
  Mentor,
  | "id"
  | "name"
  | "profileImageUrl"
  | "introduction"
  | "languages"
  | "school"
  | "major"
  | "enteredIn"
>;

export type GetMenteeByIdResponse = Pick<
  Mentee,
  | "id"
  | "name"
  | "profileImageUrl"
  | "nationality"
  | "introduction"
  | "languages"
  | "interestSchool"
  | "interestMajor"
>;

export interface GetMentorListRequest {
  page: number;
  languages?: NationCode[];
}

export interface GetMentorListResponse {
  result: Array<
    Pick<Mentor, "id" | "name" | "profileImageUrl" | "languages" | "school" | "major" | "enteredIn">
  >;
  hasNext: boolean;
}

export interface GetMenteeListRequest {
  page: number;
  nationalities?: Nationality[];
  languages?: NationCode[];
}

export interface GetMenteeListResponse {
  result: Array<
    Pick<
      Mentee,
      "id" | "name" | "profileImageUrl" | "nationality" | "interestSchool" | "interestMajor"
    >
  >;
  hasNext: boolean;
}

export interface PostAvailableTimesRequest {
  availableTimes: AvailableTimes;
}
