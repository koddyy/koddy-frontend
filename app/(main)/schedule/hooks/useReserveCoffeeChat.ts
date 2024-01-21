import useCreateCoffeeChat from "@/apis/coffeechat/hooks/useCreateCoffeeChat";
import { MenteeApplyForm } from "@/types/coffeechat";

const useReserveCoffeeChat = () => {
  const { isSuccess, mutate: createCoffeeChat } = useCreateCoffeeChat();

  const reserveCoffeeChat = (mentorId: number, { date, timeRange, question }: MenteeApplyForm) => {
    //   createCoffeeChat({ mentor, mentee, date: YYYYMMDD, startTime, endTime, ...coffeeChatForm });
  };

  return { isReserved: isSuccess, reserveCoffeeChat };
};

export default useReserveCoffeeChat;
