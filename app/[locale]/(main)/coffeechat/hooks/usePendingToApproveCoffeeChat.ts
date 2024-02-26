import { useUpdateCoffeeChatMentorApproved } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorApproved";
import { useSteps } from "@/hooks/useSteps";
import { useToggle } from "@/hooks/useToggle";

export const usePendingToApproveCoffeeChat = () => {
  const [isApprove, , setIsApprove] = useToggle();
  const {
    currentStep: approveStep,
    goToNextStep: goToNextApproveStep,
    lastStep: lastApproveStep,
  } = useSteps(2);

  const { mutate: approveCoffeeChat } = useUpdateCoffeeChatMentorApproved();

  return {
    isApprove,
    setIsApproveTrue: () => setIsApprove(true),
    setIsApproveFalse: () => setIsApprove(false),
    approveStep,
    lastApproveStep,
    goToNextApproveStep,
    approveCoffeeChat,
  };
};
