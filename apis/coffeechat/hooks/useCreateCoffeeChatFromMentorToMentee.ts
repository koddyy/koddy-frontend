import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatApi } from "../api";

export const useCreateCoffeeChatFromMentorToMentee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatApi.postCoffeeChatFromMentorToMentee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"] });
    },
  });
};
