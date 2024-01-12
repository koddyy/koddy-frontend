import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userApi.getMe,
    staleTime: Infinity,
  });
};
