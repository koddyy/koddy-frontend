import { useState } from "react";
import { useUpdateCoffeeChatMenteeRejected } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMenteeRejected";
import { PatchCoffeeChatRejectedRequest } from "@/apis/coffeechat-status/types";

const useRejectCoffeeChat = (coffeeChatId: number) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const { isSuccess, mutate: updateCoffeeChatMenteeRejected } = useUpdateCoffeeChatMenteeRejected();

  const openRejectBottomSheet = () => {
    setIsRejecting(true);
  };

  const closeRejectBottomSheet = () => {
    setIsRejecting(false);
  };

  const rejectCoffeeChat = (args: Omit<PatchCoffeeChatRejectedRequest, "coffeeChatId">) => {
    updateCoffeeChatMenteeRejected({ ...args, coffeeChatId });
  };

  return {
    isRejecting: isRejecting && !isSuccess,
    isRejected: isSuccess,
    openRejectBottomSheet,
    closeRejectBottomSheet,
    rejectCoffeeChat,
  };
};

export default useRejectCoffeeChat;
