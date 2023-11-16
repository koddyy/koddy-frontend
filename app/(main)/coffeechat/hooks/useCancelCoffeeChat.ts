import { useState } from "react";
import useUpdateCoffeeChatStatus from "@/apis/coffeechat/hooks/usePatchCoffeeChatStatus";
import { PatchCoffeeChatStatusRequest } from "@/apis/coffeechat/types";

const useCancelCoffeeChat = (applicationId: string) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { isSuccess, mutate: updateCoffeeChatStatus } = useUpdateCoffeeChatStatus();

  // for mentor
  const openCancelBottomSheet = () => {
    setIsCanceling(true);
  };
  const closeCancelBottomSheet = () => {
    setIsCanceling(false);
  };

  // for mentee
  const openPendingBottomSheet = () => {
    setIsPending(true);
  };
  const closePendingBottomSheet = () => {
    setIsPending(false);
  };

  const cancelCoffeeChat = (args?: Pick<PatchCoffeeChatStatusRequest, "statusDesc">) => {
    updateCoffeeChatStatus({ ...args, applicationId, status: "CANCEL" });
  };

  return {
    isCanceling,
    isPending,
    isCanceled: isSuccess,
    openPendingBottomSheet,
    closePendingBottomSheet,
    openCancelBottomSheet,
    closeCancelBottomSheet,
    cancelCoffeeChat,
  };
};

export default useCancelCoffeeChat;
