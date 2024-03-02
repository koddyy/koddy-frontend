import { CoffeeChatStatus } from "@/types/coffeechat";
import { NotificationType } from "@/types/notification";

export interface GetNotificationListResponse {
  result: Array<{
    id: number;
    read: boolean;
    type: NotificationType;
    createdAt: string;
    member: {
      id: number;
      name: string;
      profileImageUrl?: string;
    };
    coffeeChat: {
      id: number;
      statusSnapshot: CoffeeChatStatus;
      cancelReason?: string;
      rejectReason?: string;
      reservedDay?: string;
    };
  }>;
  hasNext: boolean;
}
