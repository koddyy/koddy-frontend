import { useState } from "react";
import useUpdateCoffeeChatStatus from "@/apis/coffeechat/hooks/usePatchCoffeeChatStatus";
import { PatchCoffeeChatStatusRequest } from "@/apis/coffeechat/types";

const useRejectCoffeeChat = (applicationId: string) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const { isSuccess, mutate: updateCoffeeChatStatus } = useUpdateCoffeeChatStatus();

  const openRejectBottomSheet = () => {
    setIsRejecting(true);
  };

  const closeRejectBottomSheet = () => {
    setIsRejecting(false);
  };

  const rejectCoffeeChat = (args?: Pick<PatchCoffeeChatStatusRequest, "statusDesc">) => {
    updateCoffeeChatStatus({ ...args, applicationId, status: "CANCEL" });
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
