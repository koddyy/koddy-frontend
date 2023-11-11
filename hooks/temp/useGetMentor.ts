import { useMemo } from "react";
import { useGetMentorList } from "@/apis/user/hooks/useGetMentorList";

export const useGetMentor = (id: string) => {
  const { data: mentorList } = useGetMentorList();

  const user = useMemo(() => mentorList.find(({ userId }) => userId === id), [id]);

  return { user };
};
