import { useUpdateCoffeeChatToCancel } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatToCancel";
import { useSteps } from "@/hooks/useSteps";
import { useToggle } from "@/hooks/useToggle";

const useCancelCoffeeChat = () => {
  const [isCancel, , setIsCancel] = useToggle();
  const {
    currentStep: cancelStep,
    goToNextStep: goToNextCancelStep,
    lastStep: lastCancelStep,
  } = useSteps(2);

  const { mutate: deleteCoffeeChat } = useUpdateCoffeeChatToCancel();

  return {
    isCancel,
    setIsCancelTrue: () => setIsCancel(true),
    setIsCancelFalse: () => setIsCancel(false),
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat: deleteCoffeeChat,
  };
};

export default useCancelCoffeeChat;
