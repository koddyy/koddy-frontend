import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../api";

export const useMarkAsReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => notificationApi.patchNotificationRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });
};
