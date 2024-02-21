import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useUpdateCoffeeChatApplyToApprove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatStatusApi.patchCoffeeChatApplyToApprove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"], refetchType: "none" });
    },
  });
};
