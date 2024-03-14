import { useUpdateCoffeeChatMenteeApproved } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMenteeApproved";
import { MenteeApplyForm } from "@/types/coffeechat";
import { formatISO, localToZonedDate, toYYYYMMDD } from "@/utils/dateUtils";

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
      start: formatISO(localToZonedDate(`${YYYYMMDD}T${startTime}`)),
      end: formatISO(localToZonedDate(`${YYYYMMDD}T${endTime}`)),
      question,
    });
  };

  return { isApproveSuccess, approveCoffeeChat };
};
