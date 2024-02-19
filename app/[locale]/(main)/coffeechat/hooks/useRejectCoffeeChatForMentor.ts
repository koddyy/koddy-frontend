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

  if (initialStatus !== "MENTEE_APPLY" && initialStatus !== "MENTEE_PENDING") return {};

  const setIsRejectTrue = () => {
    setIsReject(true);
  };

  const setIsRejectFalse = () => {
    setIsReject(false);
  };

  const isRejectSuccess = {
    MENTEE_APPLY: isApplyToRejectSuccess,
    MENTEE_PENDING: isPendingToRejectSuccess,
  };

  const rejectCoffeeChat = {
    MENTEE_APPLY: applyToRejectCoffeeChat,
    MENTEE_PENDING: pendingToRejectCoffeeChat,
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
