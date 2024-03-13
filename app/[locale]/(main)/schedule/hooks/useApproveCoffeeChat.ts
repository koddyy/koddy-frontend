import { useUpdateCoffeeChatMenteeApproved } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMenteeApproved";
import { MenteeApplyForm } from "@/types/coffeechat";
import { formatLocalDateTime, toKSTDate, toYYYYMMDD } from "@/utils/dateUtils";

export const useApproveCoffeeChat = () => {
  const { mutate: updateCoffeeChatMenteeApproved, isSuccess: isApproveSuccess } =
    useUpdateCoffeeChatMenteeApproved();

  const approveCoffeeChat = (
    coffeeChatId: number,
    { date, timeRange: [startTime, endTime], question }: MenteeApplyForm
  ) => {
    const YYYYMMDD = toYYYYMMDD(date);

    updateCoffeeChatMenteeApproved({
      coffeeChatId,
      start: formatLocalDateTime(toKSTDate(`${YYYYMMDD}T${startTime}`)),
      end: formatLocalDateTime(toKSTDate(`${YYYYMMDD}T${endTime}`)),
      question,
    });
  };

  return { isApproveSuccess, approveCoffeeChat };
};
