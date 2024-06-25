import { useUpdateCoffeeChatMentorCanceled } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorCanceled";
import { useSteps } from "@/hooks/useSteps";
import { useToggle } from "@/hooks/useToggle";

export const usePendingToFinallyCancelCoffeeChat = () => {
  const [isCancel, , setIsCancel] = useToggle();
  const {
    currentStep: cancelStep,
    goToNextStep: goToNextCancelStep,
    lastStep: lastCancelStep,
  } = useSteps(2);

  const { mutate: pendingToFinallyCancelCoffeeChat } = useUpdateCoffeeChatMentorCanceled();

  return {
    isCancel,
    setIsCancelTrue: () => setIsCancel(true),
    setIsCancelFalse: () => setIsCancel(false),
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat: pendingToFinallyCancelCoffeeChat,
  };
};
