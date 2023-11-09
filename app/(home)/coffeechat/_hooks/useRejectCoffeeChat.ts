import { useState } from "react";

const useRejectCoffeeChat = () => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const openRejectBottomSheet = () => {
    setIsRejecting(true);
  };

  const closeRejectBottomSheet = () => {
    setIsRejecting(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rejectCoffeeChat = (reason: string) => {
    // TODO: mutation
    setIsRejected(true);
  };

  return {
    isRejecting,
    isRejected,
    openRejectBottomSheet,
    closeRejectBottomSheet,
    rejectCoffeeChat,
  };
};

export default useRejectCoffeeChat;
