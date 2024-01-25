import { useMutation } from "@tanstack/react-query";
import { coffeeChatStatusApi } from "../api";

export const useDeleteCoffeeChat = () => {
  return useMutation({
    mutationFn: coffeeChatStatusApi.deleteCoffeeChat,
  });
};
