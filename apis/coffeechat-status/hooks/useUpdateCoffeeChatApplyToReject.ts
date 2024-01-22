import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useUpdateCoffeeChatApplyToReject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatStatusApi.patchCoffeeChatApplyToReject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"] });
    },
  });
};
