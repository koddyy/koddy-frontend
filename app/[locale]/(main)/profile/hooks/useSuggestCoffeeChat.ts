import { useState } from "react";
import { useCreateCoffeeChatFromMentorToMentee } from "@/apis/coffeechat/hooks/useCreateCoffeeChatFromMentorToMentee";
import { PostCoffeeChatFromMentorToMenteeRequest } from "@/apis/coffeechat/types";

export const useSuggestCoffeeChat = () => {
  const [isPending, setIsPending] = useState(false);
  const { mutate: createCoffeeChat, isSuccess } = useCreateCoffeeChatFromMentorToMentee();

  const openPendingBottomSheet = () => {
    setIsPending(true);
  };

  const closePendingBottomSheet = () => {
    setIsPending(false);
  };

  const suggestCoffeeChat = ({
    menteeId,
    suggestReason,
  }: PostCoffeeChatFromMentorToMenteeRequest) => {
    createCoffeeChat({ menteeId, suggestReason });
  };

  return {
    isPending: isPending && !isSuccess,
    isRequested: isSuccess,
    openPendingBottomSheet,
    closePendingBottomSheet,
    suggestCoffeeChat,
  };
};
