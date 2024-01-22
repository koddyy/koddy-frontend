import { apiInstance } from "../axios";
import {
  PatchCoffeeChatMenteeApprovedRequest,
  PatchCoffeeChatMentorApprovedRequest,
  PatchCoffeeChatRejectedRequest,
} from "./types";

class CoffeeChatStatusApi {
  patchCoffeeChatMenteeApproved = ({
    coffeeChatId,
    start,
    end,
    question,
  }: PatchCoffeeChatMenteeApprovedRequest) => {
    return apiInstance.patch(`/api/coffeechats/suggested/pending/${coffeeChatId}`, {
      start,
      end,
      question,
    });
  };

  patchCoffeeChatMenteeRejected = ({
    coffeeChatId,
    rejectReason,
  }: PatchCoffeeChatRejectedRequest) => {
    return apiInstance.patch(`/api/coffeechats/suggested/reject/${coffeeChatId}`, { rejectReason });
  };

  patchCoffeeChatMentorRejected = ({
    coffeeChatId,
    rejectReason,
  }: PatchCoffeeChatRejectedRequest) => {
    return apiInstance.patch(`/api/coffeechats/pending/reject/${coffeeChatId}`, {
      rejectReason,
    });
  };

  patchCoffeeChatMentorApproved = ({
    coffeeChatId,
    chatType,
    chatValue,
  }: PatchCoffeeChatMentorApprovedRequest) => {
    return apiInstance.patch(`/api/coffeechats/pending/approve/${coffeeChatId}`, {
      chatType,
      chatValue,
    });
  };
}

export const coffeeChatStatusApi = new CoffeeChatStatusApi();
