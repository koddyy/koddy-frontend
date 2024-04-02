import { CoffeeChatStatus } from "@/types/coffeechat";
import { ApplyStatusCoffeeChat } from "./ApplyStatusCoffeeChat";
import { ApproveStatusCoffeeChat } from "./ApproveStatusCoffeeChat";
import { AutoCancelStatusCoffeeChat } from "./AutoCancelStatusCoffeeChat";
import { CancelStatusCoffeeChat } from "./CancelStatusCoffeeChat";
import { CompleteStatusCoffeeChat } from "./CompleteStatusCoffeeChat";
import { PendingStatusCoffeeChat } from "./PendingStatusCoffeeChat";
import { RejectStatusCoffeeChat } from "./RejectStatusCoffeeChat";
import { SuggestStatusCoffeeChat } from "./SuggestStatusCoffeeChat";

export const CoffeeChatDetails = ({ id, status }: { id: number; status: CoffeeChatStatus }) => {
  switch (status) {
    case "MENTEE_APPLY":
      return <ApplyStatusCoffeeChat id={id} />;

    case "MENTOR_APPROVE":
    case "MENTOR_FINALLY_APPROVE":
      return <ApproveStatusCoffeeChat id={id} />;

    case "AUTO_CANCEL_FROM_MENTEE_FLOW":
    case "AUTO_CANCEL_FROM_MENTOR_FLOW":
      return <AutoCancelStatusCoffeeChat id={id} />;

    case "CANCEL_FROM_MENTEE_FLOW":
    case "CANCEL_FROM_MENTOR_FLOW":
    case "MENTOR_FINALLY_CANCEL":
      return <CancelStatusCoffeeChat id={id} />;

    case "MENTEE_APPLY_COFFEE_CHAT_COMPLETE":
    case "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE":
      return <CompleteStatusCoffeeChat id={id} />;

    case "MENTEE_PENDING":
      return <PendingStatusCoffeeChat id={id} />;

    case "MENTEE_REJECT":
    case "MENTOR_REJECT":
      return <RejectStatusCoffeeChat id={id} />;

    case "MENTOR_SUGGEST":
      return <SuggestStatusCoffeeChat id={id} />;

    default:
      return null;
  }
};
