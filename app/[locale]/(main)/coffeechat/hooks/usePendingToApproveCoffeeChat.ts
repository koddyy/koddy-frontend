import { useUpdateCoffeeChatMentorApproved } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorApproved";
import { useToggle } from "@/hooks/useToggle";

export const usePendingToApproveCoffeeChat = () => {
  const [isApprove, toggleIsApprove, setIsApprove] = useToggle();
  const { mutate: approveCoffeeChat, isSuccess: isApproveSuccess } =
    useUpdateCoffeeChatMentorApproved();

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
