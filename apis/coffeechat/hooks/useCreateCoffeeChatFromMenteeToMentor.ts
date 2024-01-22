import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatApi } from "../api";

export const useCreateCoffeeChatFromMenteeToMentor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatApi.postCoffeeChatFromMenteeToMentor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["coffeeChat"],
      });
    },
  });
};
