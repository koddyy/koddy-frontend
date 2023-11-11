import { CoffeeChatStatus } from "@/types/coffeechat";
import { User } from "@/types/user";

export interface GetCoffeeChatListResponseData {
  applicationId: string;
  mentor: User;
  mentee: User;
  status: CoffeeChatStatus;
}
