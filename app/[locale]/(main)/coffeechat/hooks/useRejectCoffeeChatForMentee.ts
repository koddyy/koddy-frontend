import { useUpdateCoffeeChatMenteeRejected } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMenteeRejected";
import { useSteps } from "@/hooks/useSteps";
import { useToggle } from "@/hooks/useToggle";

export const useRejectCoffeeChatForMentee = () => {
  const [isReject, , setIsReject] = useToggle();
  const {
    currentStep: rejectStep,
    goToNextStep: goToNextRejectStep,
    lastStep: lastRejectStep,
  } = useSteps(2);

  const { mutate: rejectCoffeeChat } = useUpdateCoffeeChatMenteeRejected();

  return {
    isReject,
    setIsRejectTrue: () => setIsReject(true),
    setIsRejectFalse: () => setIsReject(false),
    rejectStep,
    lastRejectStep,
    goToNextRejectStep,
    rejectCoffeeChat,
  };
};
