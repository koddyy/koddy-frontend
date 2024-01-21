import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useUpdateCoffeeChatMenteeApproved = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatStatusApi.patchCoffeeChatMenteeApproved,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"] });
    },
  });
};
