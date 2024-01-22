import { QueryClient, useMutation } from "@tanstack/react-query";
import { coffeeChatApi } from "../api";

export const useCreateCoffeeChatFromMentorToMentee = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: coffeeChatApi.postCoffeeChatFromMentorToMentee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"] });
    },
  });
};
