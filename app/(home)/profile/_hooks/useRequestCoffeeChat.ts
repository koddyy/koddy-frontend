import { useState } from "react";

export const useRequestCoffeeChat = () => {
  const [isPending, setIsPending] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  const openPendingBottomSheet = () => {
    setIsPending(true);
  };

  const closePendingBottomSheet = () => {
    setIsPending(false);
  };

  const requestCoffeeChat = () => {
    // TODO: mutation
    setIsRequested(true);
  };

  return {
    isPending,
    isRequested,
    openPendingBottomSheet,
    closePendingBottomSheet,
    requestCoffeeChat,
  };
};
