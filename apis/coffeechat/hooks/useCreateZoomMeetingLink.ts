import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coffeeChatApi } from "../api";

export const useCreateZoomMeetingLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coffeeChatApi.postZoomMeetingLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coffeeChat"] });
    },
  });
};
