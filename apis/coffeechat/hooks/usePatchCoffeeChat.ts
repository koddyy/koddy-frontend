import { coffeeChatApi } from "@/apis/coffeechat/api";
import { patchCoffeeChatStatusRequest } from "@/apis/coffeechat/types";
import { useMutation } from "@tanstack/react-query";

const useUpdateCoffeeChatStatus = () => {
    return useMutation({
        mutationFn: (coffeeChatStatus: patchCoffeeChatStatusRequest) => coffeeChatApi.patchCoffeeChatStatus(coffeeChatStatus);
    })
};

export default useUpdateCoffeeChatStatus;
