import { useMemo } from "react";
import { useGetMenteeList } from "@/apis/user/hooks/useGetMenteeList";

export const useGetMentee = (id: string) => {
  const { data: mentorList } = useGetMenteeList();

  const user = useMemo(() => mentorList.find(({ userId }) => userId === id), [id]);

  return { user };
};
