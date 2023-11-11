import { useSuspenseQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

const useGetCoffeeChatList = () => {
  return useSuspenseQuery({
    queryKey: ["getCoffeeChatList"],
    queryFn: coffeeChatApi.getCoffeeChatList,
    select: (data) => data.data,
  });
};

export default useGetCoffeeChatList;
