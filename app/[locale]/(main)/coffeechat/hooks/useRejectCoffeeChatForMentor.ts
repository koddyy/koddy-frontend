import { useUpdateCoffeeChatApplyToReject } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatApplyToReject";
import { useUpdateCoffeeChatMentorRejected } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorRejected";
import { useToggle } from "@/hooks/useToggle";
import { CoffeeChatStatus } from "@/types/coffeechat";

export const useRejectCoffeeChatForMentor = (initialStatus?: CoffeeChatStatus) => {
  const [isReject, toggleIsReject, setIsReject] = useToggle();
  const { mutate: applyToRejectCoffeeChat, isSuccess: isApplyToRejectSuccess } =
    useUpdateCoffeeChatApplyToReject();
  const { mutate: pendingToRejectCoffeeChat, isSuccess: isPendingToRejectSuccess } =
    useUpdateCoffeeChatMentorRejected();

  if (initialStatus !== "APPLY" && initialStatus !== "PENDING") return {};

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
