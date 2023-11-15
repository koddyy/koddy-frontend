import { useMutation } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";
import { PatchCoffeeChatStatusRequest } from "@/apis/coffeechat/types";

const useUpdateCoffeeChatStatus = () => {
  return useMutation({
    mutationFn: (coffeeChatStatus: PatchCoffeeChatStatusRequest) =>
      coffeeChatApi.patchCoffeeChatStatus(coffeeChatStatus),
  });
};

export default useUpdateCoffeeChatStatus;
