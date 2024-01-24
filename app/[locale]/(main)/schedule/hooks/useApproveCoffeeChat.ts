import { useUpdateCoffeeChatMenteeApproved } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMenteeApproved";
import { MenteeApplyForm } from "@/types/coffeechat";
import { toYYYYMMDD } from "@/utils/dateUtils";

export const useApproveCoffeeChat = () => {
  const { mutate: updateCoffeeChatMenteeApproved, isSuccess: isApproveSuccess } =
    useUpdateCoffeeChatMenteeApproved();

  const approveCoffeeChat = (
    coffeeChatId: number,
    { date, timeRange, question }: MenteeApplyForm
  ) => {
    const [startTime, endTime] = timeRange;
    const YYYYMMDD = toYYYYMMDD(date);

    updateCoffeeChatMenteeApproved({
      coffeeChatId,
      start: YYYYMMDD + "T" + startTime,
      end: YYYYMMDD + "T" + endTime,
      question,
    });
  };

  return { isApproveSuccess, approveCoffeeChat };
};
