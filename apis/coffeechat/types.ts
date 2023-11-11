import { User } from "@/types/user";

type CoffeeChatStatus = "AGREE" | "CANCEL" | "DONE" | "FAIL" | "REQUEST" | "SUGGEST";

export interface GetCoffeeChatListResponseData {
  applicationId: string;
  mentor: User;
  mentee: User;
  status?: CoffeeChatStatus;
}
