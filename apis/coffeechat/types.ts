import { CoffeeChatType } from "@/constants/coffeechat";
import {
  CoffeeChatCategory,
  CoffeeChatStatus,
  PassedCoffeeChatStatus,
  WaitingCoffeeChatStatus,
} from "@/types/coffeechat";
import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";

export interface PostCoffeeChatFromMentorToMenteeRequest {
  menteeId: number;
  suggestReason: string;
}

export interface PostCoffeeChatFromMentorToMenteeResponse {
  coffeeChatId: number;
}

export interface PostCoffeeChatFromMenteeToMentorRequest {
  mentorId: number;
  applyReason: string;
  start: string;
  end: string;
}

export interface PostCoffeeChatFromMenteeToMentorResponse {
  coffeeChatId: number;
}

export interface GetAppliedCoffeeChatListResponse {
  result: Array<
    Pick<
      Mentee,
      "name" | "profileImageUrl" | "nationality" | "interestSchool" | "interestMajor"
    > & {
      coffeeChatId: number;
      menteeId: number;
    }
  >;
  totalCount: number;
  hasNext: boolean;
}

export interface GetSuggestedCoffeeChatListResponse {
  result: Array<
    Pick<Mentor, "name" | "profileImageUrl" | "languages" | "school" | "major" | "enteredIn"> & {
      coffeeChatId: number;
      mentorId: number;
    }
  >;
  totalCount: number;
  hasNext: boolean;
}

export interface GetCoffeeChatCountsResponse {
  suggested: number;
  waiting: number;
  scheduled: number;
  passed: number;
}

export interface GetCoffeeChatListRequest {
  category: CoffeeChatCategory;
  detail?: WaitingCoffeeChatStatus | PassedCoffeeChatStatus;
  page: number;
}

export interface GetCoffeeChatListWithMentorResponse {
  result: Array<
    {
      id: number;
      status: CoffeeChatStatus;
      mentorId: number;
    } & Pick<Mentor, "name" | "profileImageUrl" | "school" | "major" | "enteredIn">
  >;
  hasNext: boolean;
}

export interface GetCoffeeChatListWithMenteeResponse {
  result: Array<
    {
      id: number;
      status: CoffeeChatStatus;
      menteeId: number;
    } & Pick<Mentee, "name" | "profileImageUrl" | "interestSchool" | "interestMajor">
  >;
  hasNext: boolean;
}

export type GetCoffeeChatByIdResponse = {
  coffeeChat: {
    id: number;
    status: CoffeeChatStatus;
    applyReason: string;
    suggestReason: string;
    rejectReason: string | null;
    cancelReason: string | null;
    question: string | null;
    start: string;
    end: string;
    chatType: Exclude<CoffeeChatType, "zoomAuto">;
    chatValue: string;
  };
} & (
  | {
      mentee: Pick<
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
      mentor: undefined;
    }
  | {
      mentor: Pick<
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
      mentee: undefined;
    }
);

export interface PostZoomMeetingLinkRequest {
  authorizationCode: string;
  state: string;
  topic: string;
  start: string;
  end: string;
}

export interface PostZoomMeetingLinkResponse {
  id: string;
  hostEmail: string;
  topic: string;
  joinUrl: string;
  duration: number;
}

/**
 * =========================
 * @TODO remove
 * =========================
 */

export type GetCoffeeChatListResponse = GetCoffeeChatByIdResponse[];
