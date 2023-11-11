import { useState } from "react";
import useCreateCoffeeChat from "@/apis/coffeechat/hooks/useCreateCoffeeChat";
import { PostCoffeeChatRequest } from "@/apis/coffeechat/types";

export const useRequestCoffeeChat = () => {
  const [isPending, setIsPending] = useState(false);
  const { mutate: createCoffeeChat, isSuccess } = useCreateCoffeeChat();

  const openPendingBottomSheet = () => {
    setIsPending(true);
  };

  const closePendingBottomSheet = () => {
    setIsPending(false);
  };

  const requestCoffeeChat = ({
    mentor,
    mentee,
  }: Pick<PostCoffeeChatRequest, "mentor" | "mentee">) => {
    createCoffeeChat({ mentor, mentee });
  };

  return {
    isPending,
    isRequested: isSuccess,
    openPendingBottomSheet,
    closePendingBottomSheet,
    requestCoffeeChat,
  };
};
