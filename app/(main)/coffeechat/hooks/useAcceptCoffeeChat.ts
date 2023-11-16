import useUpdateCoffeeChatStatus from "@/apis/coffeechat/hooks/usePatchCoffeeChatStatus";
import { PatchCoffeeChatStatusRequest } from "@/apis/coffeechat/types";

const useAcceptCoffeeChat = (applicationId: string) => {
  const { isSuccess, mutate: updateCoffeeChatStatus } = useUpdateCoffeeChatStatus();

  const acceptCoffeeChat = (args?: Pick<PatchCoffeeChatStatusRequest, "statusDesc">) => {
    updateCoffeeChatStatus({ ...args, applicationId, status: "AGREE" });
  };

  return { isAccepted: isSuccess, acceptCoffeeChat };
};

export default useAcceptCoffeeChat;
