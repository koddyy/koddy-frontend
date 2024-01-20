import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useGetMeAsMentee = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userApi.getMe,
    select: (me) => {
      if (me.role === "mentee") return me;
    },
    staleTime: Infinity,
  });
};
