import { useCreateCoffeeChatFromMenteeToMentor } from "@/apis/coffeechat/hooks/useCreateCoffeeChatFromMenteeToMentor";
import { MenteeApplyForm } from "@/types/coffeechat";
import { toYYYYMMDD } from "@/utils/dateUtils";

export const useApplyCoffeeChat = () => {
  const { mutate: createCoffeeChat, isSuccess: isApplySuccess } =
    useCreateCoffeeChatFromMenteeToMentor();

  const applyCoffeeChat = (mentorId: number, { date, timeRange, question }: MenteeApplyForm) => {
    const [startTime, endTime] = timeRange;
    const YYYYMMDD = toYYYYMMDD(date);

    createCoffeeChat({
      mentorId,
      start: YYYYMMDD + "T" + startTime,
      end: YYYYMMDD + "T" + endTime,
      applyReason: question,
    });
  };

  return { applyCoffeeChat, isApplySuccess };
};
