import useCreateCoffeeChat from "@/apis/coffeechat/hooks/useCreateCoffeeChat";
import { PostCoffeeChatRequest } from "@/apis/coffeechat/types";
import { CoffeeChatForm } from "@/types/coffeechat";
import { toYYYYMMDD } from "@/utils/dateUtils";

const useReserveCoffeeChat = () => {
  const { isSuccess, mutate: createCoffeeChat } = useCreateCoffeeChat();

  const reserveCoffeeChat = (
    { date, time, ...coffeeChatForm }: CoffeeChatForm,
    { mentor, mentee }: Pick<PostCoffeeChatRequest, "mentor" | "mentee">
  ) => {
    const YYYYMMDD = toYYYYMMDD(date);
    const [startTime, endTime] = time.split(" ~ ");

    createCoffeeChat({ mentor, mentee, date: YYYYMMDD, startTime, endTime, ...coffeeChatForm });
  };

  return { isReserved: isSuccess, reserveCoffeeChat };
};

export default useReserveCoffeeChat;
