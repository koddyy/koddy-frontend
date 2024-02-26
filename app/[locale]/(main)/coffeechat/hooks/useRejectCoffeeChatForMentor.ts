import { useUpdateCoffeeChatApplyToReject } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatApplyToReject";
import { useSteps } from "@/hooks/useSteps";
import { useToggle } from "@/hooks/useToggle";

export const useRejectCoffeeChatForMentor = () => {
  const [isReject, , setIsReject] = useToggle();
  const {
    currentStep: rejectStep,
    goToNextStep: goToNextRejectStep,
    lastStep: lastRejectStep,
  } = useSteps(2);

  const { mutate: rejectCoffeeChat } = useUpdateCoffeeChatApplyToReject();

  const setIsRejectTrue = () => {
    setIsReject(true);
  };

  const setIsRejectFalse = () => {
    setIsReject(false);
  };

  return {
    isReject,
    setIsRejectTrue,
    setIsRejectFalse,
    rejectStep,
    lastRejectStep,
    goToNextRejectStep,
    rejectCoffeeChat,
  };
};
