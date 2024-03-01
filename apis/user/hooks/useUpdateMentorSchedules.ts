import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api";

export const useUpdateMentorSchedules = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.patchMentorSchedules,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};
