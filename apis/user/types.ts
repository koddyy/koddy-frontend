import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";
import { AvailableTimes } from "@/types/user";

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

export interface PostAvailableTimesRequest {
  availableTimes: AvailableTimes;
}
