import { useMutation } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useUpdateCoffeeChatToCancel = () => {
  return useMutation({
    mutationFn: coffeeChatStatusApi.patchCoffeeChatToCancel,
  });
};
