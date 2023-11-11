import { useMutation } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";
import { PostCoffeeChatRequest } from "@/apis/coffeechat/types";

const useCreateCoffeeChat = () => {
  return useMutation({
    mutationFn: (coffeeChatForm: PostCoffeeChatRequest) =>
      coffeeChatApi.postCoffeeChat(coffeeChatForm),
  });
};

export default useCreateCoffeeChat;
