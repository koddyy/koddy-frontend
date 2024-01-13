import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api";

export const useUpdateMentorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.patchMentorProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
