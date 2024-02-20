import { useUpdateCoffeeChatApplyToApprove } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatApplyToApprove";
import { useUpdateCoffeeChatMentorApproved } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorApproved";
import { useToggle } from "@/hooks/useToggle";
import { CoffeeChatStatus } from "@/types/coffeechat";

export const useApproveCoffeeChatForMentor = (
  initialStatus: Extract<CoffeeChatStatus, "MENTEE_APPLY" | "MENTEE_PENDING">
) => {
  const [isApprove, toggleIsApprove, setIsApprove] = useToggle();
  const { mutate: applyToApproveCoffeeChat, isSuccess: isApplyToApproveSuccess } =
    useUpdateCoffeeChatApplyToApprove();
  const { mutate: pendingToApproveCoffeeChat, isSuccess: isPendingToApproveSuccess } =
    useUpdateCoffeeChatMentorApproved();

  const setIsApproveTrue = () => {
    setIsApprove(true);
  };

  const setIsApproveFalse = () => {
    setIsApprove(false);
  };

  const isApproveSuccess = {
    MENTEE_APPLY: isApplyToApproveSuccess,
    MENTEE_PENDING: isPendingToApproveSuccess,
  };

  const approveCoffeeChat = {
    MENTEE_APPLY: applyToApproveCoffeeChat,
    MENTEE_PENDING: pendingToApproveCoffeeChat,
  };

  return {
    isApprove,
    isApproveSuccess: isApproveSuccess[initialStatus],
    toggleIsApprove,
    setIsApproveTrue,
    setIsApproveFalse,
    approveCoffeeChat: approveCoffeeChat[initialStatus],
  };
};
