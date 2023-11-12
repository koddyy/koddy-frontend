import { useMutation } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";
import { patchCoffeeChatStatusRequest } from "@/apis/coffeechat/types";

const useUpdateCoffeeChatStatus = () => {
  return useMutation({
    mutationFn: (coffeeChatStatus: patchCoffeeChatStatusRequest) =>
      coffeeChatApi.patchCoffeeChatStatus(coffeeChatStatus),
  });
};

export default useUpdateCoffeeChatStatus;
