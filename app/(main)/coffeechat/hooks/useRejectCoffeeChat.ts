import { useState } from "react";
import useUpdateCoffeeChatStatus from "@/apis/coffeechat/hooks/usePatchCoffeeChatStatus";
import { patchCoffeeChatStatusRequest } from "@/apis/coffeechat/types";

const useRejectCoffeeChat = (applicationId: string) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const { isSuccess, mutate: updateCoffeeChatStatus } = useUpdateCoffeeChatStatus();

  const openRejectBottomSheet = () => {
    setIsRejecting(true);
  };

  const closeRejectBottomSheet = () => {
    setIsRejecting(false);
  };

  const rejectCoffeeChat = (args?: Pick<patchCoffeeChatStatusRequest, "statusDesc">) => {
    updateCoffeeChatStatus({ ...args, applicationId, status: "CANCEL" });
  };

  return {
    isRejecting,
    isRejected: isSuccess,
    openRejectBottomSheet,
    closeRejectBottomSheet,
    rejectCoffeeChat,
  };
};

export default useRejectCoffeeChat;
