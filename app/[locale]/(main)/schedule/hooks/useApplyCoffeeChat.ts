import { useCreateCoffeeChatFromMenteeToMentor } from "@/apis/coffeechat/hooks/useCreateCoffeeChatFromMenteeToMentor";
import { MenteeApplyForm } from "@/types/coffeechat";
import { formatLocalDateTime, toKSTDate, toYYYYMMDD } from "@/utils/dateUtils";

export const useApplyCoffeeChat = () => {
  const { mutate: createCoffeeChat, isSuccess: isApplySuccess } =
    useCreateCoffeeChatFromMenteeToMentor();

  const applyCoffeeChat = (
    mentorId: number,
    { date, timeRange: [startTime, endTime], question }: MenteeApplyForm
  ) => {
    const YYYYMMDD = toYYYYMMDD(date);

    createCoffeeChat({
      mentorId,
      start: formatLocalDateTime(toKSTDate(`${YYYYMMDD}T${startTime}`)),
      end: formatLocalDateTime(toKSTDate(`${YYYYMMDD}T${endTime}`)),
      applyReason: question,
    });
  };

  return { applyCoffeeChat, isApplySuccess };
};
