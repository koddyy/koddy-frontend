import { useUpdateCoffeeChatMenteeApproved } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMenteeApproved";
import { MenteeApplyForm } from "@/types/coffeechat";
import { toYYYYMMDD } from "@/utils/dateUtils";

export const useApproveCoffeeChat = () => {
  const { isSuccess, mutate: updateCoffeeChatMenteeApproved } = useUpdateCoffeeChatMenteeApproved();

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

  return { isApproved: isSuccess, approveCoffeeChat };
};
