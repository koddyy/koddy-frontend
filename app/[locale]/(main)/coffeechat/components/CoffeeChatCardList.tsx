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

  if (coffeeChatListWithMentor.length === 0) return <Empty text="멘토 보러 가기" />;

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

  if (coffeeChatListWithMentee.length === 0) return <Empty text="멘티 보러 가기" />;

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

const Empty = ({ text }: { text: string }) => {
  return (
    <div className="mt-[80px] flex flex-col items-center">
      <img className="h-[136px] w-[165px]" src="/images/illustration_no_coffee_chat.svg" />
      <div className="mb-[12px] mt-[17px]">커피챗이 없어요</div>
      <Link
        href="/"
        className="body-1-bold flex h-[44px] w-[237px] items-center justify-center rounded-[10px] border border-primary text-gray-600"
      >
        {text}
      </Link>
    </div>
  );
};
