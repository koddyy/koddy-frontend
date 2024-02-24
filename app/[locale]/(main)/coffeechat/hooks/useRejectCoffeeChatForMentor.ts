import { useUpdateCoffeeChatApplyToReject } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatApplyToReject";
import { useToggle } from "@/hooks/useToggle";

export const useRejectCoffeeChatForMentor = () => {
  const [isReject, toggleIsReject, setIsReject] = useToggle();
  const { mutate: rejectCoffeeChat, isSuccess: isRejectSuccess } =
    useUpdateCoffeeChatApplyToReject();

  const setIsRejectTrue = () => {
    setIsReject(true);
  };

  const setIsRejectFalse = () => {
    setIsReject(false);
  };

  return {
    isReject,
    isRejectSuccess,
    toggleIsReject,
    setIsRejectTrue,
    setIsRejectFalse,
    rejectCoffeeChat,
  };
};
