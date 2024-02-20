import { useUpdateCoffeeChatApplyToApprove } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatApplyToApprove";
import { useToggle } from "@/hooks/useToggle";

export const useApplyToApproveCoffeeChat = () => {
  const [isApprove, toggleIsApprove, setIsApprove] = useToggle();
  const { mutate: approveCoffeeChat, isSuccess: isApproveSuccess } =
    useUpdateCoffeeChatApplyToApprove();

  const setIsApproveTrue = () => {
    setIsApprove(true);
  };

  const setIsApproveFalse = () => {
    setIsApprove(false);
  };

  return {
    isApprove: isApprove && !isApproveSuccess,
    isApproveSuccess,
    toggleIsApprove,
    setIsApproveTrue,
    setIsApproveFalse,
    approveCoffeeChat,
  };
};
