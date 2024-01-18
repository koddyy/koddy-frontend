import { QueryClient, useMutation } from "@tanstack/react-query";
import { userApi } from "../api";

export const useUpdateMentorSchedules = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: userApi.patchMentorSchedules,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};
