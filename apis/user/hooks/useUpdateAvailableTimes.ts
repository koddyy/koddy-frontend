import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import { AvailableTimes } from "@/types/coffeechat";

export const useUpdateAvailableTimes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (availableTimes: AvailableTimes) => userApi.postAvailableTimes({ availableTimes }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMe"],
      });
    },
  });
};
