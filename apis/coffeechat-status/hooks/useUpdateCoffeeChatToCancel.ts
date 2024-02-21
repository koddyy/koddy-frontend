import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useUpdateCoffeeChatToCancel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatStatusApi.patchCoffeeChatToCancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"], refetchType: "none" });
    },
  });
};
