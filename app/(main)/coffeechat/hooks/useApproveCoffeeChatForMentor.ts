import { useUpdateCoffeeChatApplyToApprove } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatApplyToApprove";
import { useUpdateCoffeeChatMentorApproved } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorApproved";
import { useToggle } from "@/hooks/useToggle";

export const useApproveCoffeeChatForMentor = (initialStatus: "APPLY" | "PENDING") => {
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
    APPLY: isApplyToApproveSuccess,
    PENDING: isPendingToApproveSuccess,
  };

  const approveCoffeeChat = {
    APPLY: applyToApproveCoffeeChat,
    PENDING: pendingToApproveCoffeeChat,
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
