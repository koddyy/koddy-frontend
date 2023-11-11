import { useMutation } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";
import { PostCoffeeChatRequest } from "@/apis/coffeechat/types";

const usePostCoffeeChat = () => {
  return useMutation({
    mutationFn: (coffeeChatForm: PostCoffeeChatRequest) =>
      coffeeChatApi.postCoffeeChat(coffeeChatForm),
  });
};

export default usePostCoffeeChat;
