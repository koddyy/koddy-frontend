import useCreateCoffeeChat from "@/apis/coffeechat/hooks/useCreateCoffeeChat";
import type { PostCoffeeChatRequest } from "@/apis/coffeechat/types";
import type { ScheduleForm } from "@/app/(main)/schedule/types/scheduleForm";
import { toYYYYMMDD } from "@/utils/dateUtils";

const useReserveCoffeeChat = () => {
  const { isSuccess, mutate: createCoffeeChat } = useCreateCoffeeChat();

  const reserveCoffeeChat = (
    { date, timeRange, ...coffeeChatForm }: ScheduleForm,
    { mentor, mentee }: Pick<PostCoffeeChatRequest, "mentor" | "mentee">
  ) => {
    const YYYYMMDD = toYYYYMMDD(date);
    const [startTime, endTime] = timeRange.split(" ~ ");

    createCoffeeChat({ mentor, mentee, date: YYYYMMDD, startTime, endTime, ...coffeeChatForm });
  };

  return { isReserved: isSuccess, reserveCoffeeChat };
};

export default useReserveCoffeeChat;
