import { apiInstance } from "../axios";
import {
  PatchCoffeeChatApplyToApproveRequest,
  PatchCoffeeChatApplyToRejectRequest,
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

  patchCoffeeChatApplyToApprove = ({
    coffeeChatId,
    chatType,
    chatValue,
  }: PatchCoffeeChatApplyToApproveRequest) => {
    return apiInstance.patch(`/api/coffeechats/applied/approve/${coffeeChatId}`, {
      chatType,
      chatValue,
    });
  };

  patchCoffeeChatApplyToReject = ({
    coffeeChatId,
    rejectReason,
  }: PatchCoffeeChatApplyToRejectRequest) => {
    return apiInstance.patch(`/api/coffeechats/applied/reject/${coffeeChatId}`, {
      rejectReason,
    });
  };

  deleteCoffeeChat = ({ coffeeChatId }: { coffeeChatId: number }) => {
    return apiInstance.delete(`/api/coffeechats/cancel/${coffeeChatId}`);
  };
}

export const coffeeChatStatusApi = new CoffeeChatStatusApi();
