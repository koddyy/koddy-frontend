import { User } from "@/types/user";

export interface GetCoffeeChatResponseData {
  applicationId: string;
  mentor: User;
  mentee: User;
}
