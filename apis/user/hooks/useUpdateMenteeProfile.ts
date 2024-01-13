import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api";

export const useUpdateMenteeProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.patchMenteeProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
