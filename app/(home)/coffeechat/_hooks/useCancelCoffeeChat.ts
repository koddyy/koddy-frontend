import { useState } from "react";

const useCancelCoffeeChat = () => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

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

  const cancelCoffeeChat = (reason?: string) => {
    // TODO: mutation
    console.log(reason);
    setIsCanceled(true);
  };

  return {
    isCanceling,
    isPending,
    isCanceled,
    openPendingBottomSheet,
    closePendingBottomSheet,
    openCancelBottomSheet,
    closeCancelBottomSheet,
    cancelCoffeeChat,
  };
};

export default useCancelCoffeeChat;
