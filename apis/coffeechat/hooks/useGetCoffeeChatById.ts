import { useQuery } from "@tanstack/react-query";
import { coffeeChatApi } from "@/apis/coffeechat/api";

const useGetCoffeeChatById = (id: string) => {
  return useQuery({
    queryKey: ["getCoffeeChatById", id],
    queryFn: () => coffeeChatApi.getCoffeeChatById(id),
    select: (data) => data.data,
  });
};

export default useGetCoffeeChatById;
