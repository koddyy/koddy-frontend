import { useSuspenseQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

export const useGetNewAppliedCoffeeChatList = (limit?: number) => {
  return useSuspenseQuery({
    queryKey: ["coffeeChat", "list", "new"],
    queryFn: () => coffeeChatApi.getNewAppliedCoffeeChatList(limit),
  });
};
