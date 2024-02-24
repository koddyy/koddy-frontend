import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useUpdateCoffeeChatMentorCanceled = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatStatusApi.patchCoffeeChatMentorCanceled,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"], refetchType: "none" });
    },
  });
};
