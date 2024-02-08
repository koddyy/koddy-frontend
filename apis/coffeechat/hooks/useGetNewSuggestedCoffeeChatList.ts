import { useSuspenseQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

export const useGetNewSuggestedCoffeeChatList = (limit?: number) => {
  return useSuspenseQuery({
    queryKey: ["coffeeChat", "list", "new"],
    queryFn: () => coffeeChatApi.getNewSuggestedCoffeeChatList(limit),
  });
};
