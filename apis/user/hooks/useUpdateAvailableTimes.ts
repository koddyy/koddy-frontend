import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import { AvailableTimes as ClientAvailableTimes } from "@/types/coffeechat";
import { revertAvailableTimes } from "@/utils/availableTimes";

export const useUpdateAvailableTimes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (availableTimes: ClientAvailableTimes) => {
      return userApi.postAvailableTimes({ availableTimes: revertAvailableTimes(availableTimes) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMe"],
      });
    },
  });
};
