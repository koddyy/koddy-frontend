import { useDeleteCoffeeChat } from "@/apis/coffeechat-status/hooks/useDeleteCoffeeChat";
import { useToggle } from "@/hooks/useToggle";

const useCancelCoffeeChat = () => {
  const { mutate: deleteCoffeeChat, isSuccess: isCancelSuccess } = useDeleteCoffeeChat();
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
