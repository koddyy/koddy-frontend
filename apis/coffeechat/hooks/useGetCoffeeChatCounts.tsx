import { useQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "../api";

export const useGetCoffeeChatCount = () => {
  return useQuery({
    queryKey: ["coffeechat", "counts"],
    queryFn: coffeeChatApi.getCoffeeChatCounts,
  });
};
