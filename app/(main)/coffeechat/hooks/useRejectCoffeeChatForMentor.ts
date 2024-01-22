import { useUpdateCoffeeChatMentorRejected } from "@/apis/coffeechat-status/hooks/useUpdateCoffeeChatMentorRejected";
import { useToggle } from "@/hooks/useToggle";

export const useRejectCoffeeChatForMentor = () => {
  const [isReject, toggleIsReject, setIsReject] = useToggle();
  const { mutate: updateCoffeeChatRejected, isSuccess: isRejectSuccess } =
    useUpdateCoffeeChatMentorRejected();

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
