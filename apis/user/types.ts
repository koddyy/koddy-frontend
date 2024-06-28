import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";
import { Language, Nationality } from "@/types/user";

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
  languages?: Language[];
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
  languages?: Language[];
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

export type PatchMentorInfoRequest = Pick<
  Mentor,
  "name" | "school" | "major" | "enteredIn" | "languages" | "introduction" | "profileImageUrl"
>;

export type PatchMenteeInfoRequest = Pick<
  Mentee,
  | "name"
  | "interestSchool"
  | "interestMajor"
  | "nationality"
  | "languages"
  | "introduction"
  | "profileImageUrl"
>;
