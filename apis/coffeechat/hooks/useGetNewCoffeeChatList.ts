import { useSuspenseQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

const useGetNewCoffeeChatList = () => {
  return useSuspenseQuery({
    queryKey: ["getNewCoffeeChatList"],
    queryFn: coffeeChatApi.getNewCoffeeChatList,
    select: (data) => data.data,
  });
};

export default useGetNewCoffeeChatList;
