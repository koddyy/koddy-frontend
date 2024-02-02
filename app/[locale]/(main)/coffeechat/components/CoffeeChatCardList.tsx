/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { useGetCoffeeChatListWithMenteeByStatus } from "@/apis/coffeechat/hooks/useGetCoffeeChatListWithMenteeByStatus";
import { useGetCoffeeChatListWithMentorByStatus } from "@/apis/coffeechat/hooks/useGetCoffeeChatListWithMentorByStatus";
import { useIntersect } from "@/hooks/useIntersect";
import { CoffeeChatCategory, CoffeeChatStatus } from "@/types/coffeechat";
import { CoffeeChatCard } from "./CoffeeChatCard";

interface CoffeeChatCardListProps {
  category: CoffeeChatCategory;
  status?: CoffeeChatStatus;
}

export const CoffeeChatCardListWithMentor = ({ category, status }: CoffeeChatCardListProps) => {
  const {
    data: coffeeChatListWithMentor,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useGetCoffeeChatListWithMentorByStatus({
    page: 1,
    category,
    status,
  });
  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  return (
    <>
      {coffeeChatListWithMentor.map(({ id, status, mentorId, ...mentor }) => {
        return (
          <Link key={id} href={`/coffeechat/${id}`}>
            <CoffeeChatCard status={status} role="mentor" {...mentor} />
          </Link>
        );
      })}
      <div ref={ref} />
    </>
  );
};

export const CoffeeChatCardListWithMentee = ({ category, status }: CoffeeChatCardListProps) => {
  const {
    data: coffeeChatListWithMentee,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useGetCoffeeChatListWithMenteeByStatus({
    page: 1,
    category,
    status,
  });
  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  return (
    <>
      {coffeeChatListWithMentee.map(({ id, status, menteeId, ...mentee }) => {
        return (
          <Link key={id} href={`/coffeechat/${id}`}>
            <CoffeeChatCard status={status} role="mentee" {...mentee} />
          </Link>
        );
      })}
      <div ref={ref} />
    </>
  );
};
