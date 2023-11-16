import { useQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

const useGetCoffeeChatNotification = () => {
  return useQuery({
    queryKey: ["getCoffeeChatNotification"],
    queryFn: coffeeChatApi.getCoffeeChatNotification,
    select: (data) => data.data,
  });
};

export default useGetCoffeeChatNotification;
