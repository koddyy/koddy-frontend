import { useUpdateCoffeeChatMentorCanceled } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorCanceled";
import { useToggle } from "@/hooks/useToggle";

export const usePendingToFinallyCancelCoffeeChat = () => {
  const { mutate: pendingToRejectCoffeeChat, isSuccess: isCancelSuccess } =
    useUpdateCoffeeChatMentorCanceled();
  const [isCancel, toggleIsCancel, setIsCancel] = useToggle();

  return {
    isCancel: isCancel && !isCancelSuccess,
    isCancelSuccess,
    toggleIsCancel,
    setIsCancelTrue: () => setIsCancel(true),
    setIsCancelFalse: () => setIsCancel(false),
    cancelCoffeeChat: pendingToRejectCoffeeChat,
  };
};
