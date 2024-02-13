import { useCreateCoffeeChatFromMentorToMentee } from "@/apis/coffeechat/hooks/useCreateCoffeeChatFromMentorToMentee";
import { PostCoffeeChatFromMentorToMenteeRequest } from "@/apis/coffeechat/types";

export const useSuggestCoffeeChat = () => {
  const {
    mutate: createCoffeeChat,
    isPending,
    isSuccess,
  } = useCreateCoffeeChatFromMentorToMentee();

  const suggestCoffeeChat = ({
    menteeId,
    suggestReason,
  }: PostCoffeeChatFromMentorToMenteeRequest) => {
    createCoffeeChat({ menteeId, suggestReason });
  };

  return {
    isPending,
    isSuccess,
    suggestCoffeeChat,
  };
};
