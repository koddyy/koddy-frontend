import { useUpdateCoffeeChatApplyToReject } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatApplyToReject";
import { useUpdateCoffeeChatMentorRejected } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorRejected";
import { useToggle } from "@/hooks/useToggle";

export const useRejectCoffeeChatForMentor = (initialStatus: "APPLY" | "PENDING") => {
  const [isReject, toggleIsReject, setIsReject] = useToggle();
  const { mutate: applyToRejectCoffeeChat, isSuccess: isApplyToRejectSuccess } =
    useUpdateCoffeeChatApplyToReject();
  const { mutate: pendingToRejectCoffeeChat, isSuccess: isPendingToRejectSuccess } =
    useUpdateCoffeeChatMentorRejected();

  const setIsRejectTrue = () => {
    setIsReject(true);
  };

  const setIsRejectFalse = () => {
    setIsReject(false);
  };

  const isRejectSuccess = {
    APPLY: isApplyToRejectSuccess,
    PENDING: isPendingToRejectSuccess,
  };

  const rejectCoffeeChat = {
    APPLY: applyToRejectCoffeeChat,
    PENDING: pendingToRejectCoffeeChat,
  };

  return {
    isReject,
    isRejectSuccess: isRejectSuccess[initialStatus],
    toggleIsReject,
    setIsRejectTrue,
    setIsRejectFalse,
    rejectCoffeeChat: rejectCoffeeChat[initialStatus],
  };
};
