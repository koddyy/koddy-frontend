import { apiInstance } from "../axios";
import { GetNotificationListResponse } from "./types";

export const notificationApi = {
  getNotificationList: async ({ page }: { page: number }) => {
    const response = await apiInstance.get<GetNotificationListResponse>("/api/notifications/me", {
      params: {
        page,
      },
    });

    return response.data;
  },

  patchNotificationRead: (notificationId: number) => {
    return apiInstance.patch(`/api/notifications/${notificationId}/read`);
  },

  patchNotificationReadAll: () => {
    return apiInstance.patch(`/api/notifications/me/read-all`);
  },
};
