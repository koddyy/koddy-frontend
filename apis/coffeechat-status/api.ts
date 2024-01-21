import { apiInstance } from "../axios";
import {
  PatchCoffeeChatMenteeApprovedRequest,
  PatchCoffeeChatMenteeRejectedRequest,
} from "./types";

class CoffeeChatStatusApi {
  patchCoffeeChatMenteeApproved = ({
    coffeeChatId,
    start,
    end,
  }: PatchCoffeeChatMenteeApprovedRequest) => {
    return apiInstance.patch(`/api/coffeechats/suggested/pending/${coffeeChatId}`, { start, end });
  };

  patchCoffeeChatMenteeRejected = ({
    coffeeChatId,
    rejectReason,
  }: PatchCoffeeChatMenteeRejectedRequest) => {
    return apiInstance.patch(`/api/coffeechats/suggested/reject/${coffeeChatId}`, { rejectReason });
  };
}

export const coffeeChatStatusApi = new CoffeeChatStatusApi();
