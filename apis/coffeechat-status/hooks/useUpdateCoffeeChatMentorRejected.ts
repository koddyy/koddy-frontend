import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useUpdateCoffeeChatMentorRejected = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatStatusApi.patchCoffeeChatMentorRejected,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"], refetchType: "none" });
    },
  });
};
