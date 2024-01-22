import { useUpdateCoffeeChatMenteeRejected } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMenteeRejected";
import { useToggle } from "@/hooks/useToggle";

export const useRejectCoffeeChatForMentee = () => {
  const [isReject, toggleIsReject, setIsReject] = useToggle();
  const { mutate: updateCoffeeChatRejected, isSuccess: isRejectSuccess } =
    useUpdateCoffeeChatMenteeRejected();

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
    rejectCoffeeChat: updateCoffeeChatRejected,
  };
};
