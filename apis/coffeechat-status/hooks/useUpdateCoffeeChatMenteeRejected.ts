import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useUpdateCoffeeChatMenteeRejected = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatStatusApi.patchCoffeeChatMenteeRejected,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"] });
    },
  });
};
