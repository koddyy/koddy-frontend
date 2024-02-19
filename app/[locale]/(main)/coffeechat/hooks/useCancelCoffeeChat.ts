import { useUpdateCoffeeChatToCancel } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatToCancel";
import { useToggle } from "@/hooks/useToggle";

const useCancelCoffeeChat = () => {
  const { mutate: deleteCoffeeChat, isSuccess: isCancelSuccess } = useUpdateCoffeeChatToCancel();
  const [isCancel, toggleIsCancel, setIsCancel] = useToggle();

  return {
    isCancel: isCancel && !isCancelSuccess,
    isCancelSuccess,
    toggleIsCancel,
    setIsCancelTrue: () => setIsCancel(true),
    setIsCancelFalse: () => setIsCancel(false),
    cancelCoffeeChat: deleteCoffeeChat,
  };
};

export default useCancelCoffeeChat;
