import { useSuspenseQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

export const useGetNewAppliedCoffeeChatList = (limit?: number) => {
  return useSuspenseQuery({
    queryKey: ["getNewAppliedCoffeeChatList"],
    queryFn: () => coffeeChatApi.getNewAppliedCoffeeChatList(limit),
  });
};
