/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCoffeeChatListWithMenteeByCategoryAndStatus } from "@/apis/coffeechat/hooks/useGetCoffeeChatListWithMenteeByCategoryAndStatus";
import { useGetCoffeeChatListWithMentorByCategoryAndStatus } from "@/apis/coffeechat/hooks/useGetCoffeeChatListWithMentorByCategoryAndStatus";
import { useIntersect } from "@/hooks/useIntersect";
import { Link } from "@/libs/navigation";
import { CoffeeChatCategory, CoffeeChatStatus } from "@/types/coffeechat";
import { CoffeeChatCard } from "./CoffeeChatCard";

interface CoffeeChatCardListProps {
  category: Exclude<CoffeeChatCategory, "suggest">;
  status?: CoffeeChatStatus;
}

export const CoffeeChatCardListWithMentor = ({ category, status }: CoffeeChatCardListProps) => {
  const {
    data: coffeeChatListWithMentor,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useGetCoffeeChatListWithMentorByCategoryAndStatus({
    page: 1,
    category,
    status,
  });
  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  if (coffeeChatListWithMentor.length === 0) return <Empty category={category} />;

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
  } = useGetCoffeeChatListWithMenteeByCategoryAndStatus({
    page: 1,
    category,
    status,
  });
  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  if (coffeeChatListWithMentee.length === 0) return <Empty category={category} />;

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

const EmptyText = {
  waiting: "대기중인 커피챗이 없어요",
  scheduled: "예정된 커피챗이 없어요",
  passed: "지난 커피챗이 없어요",
} as const;

const Empty = ({ category }: { category: Exclude<CoffeeChatCategory, "suggest"> }) => {
  return (
    <div className="mt-[80px] flex flex-col items-center">
      <img
        className="h-[136px] w-[165px] opacity-60"
        src="/images/illustration_no_coffee_chat.svg"
      />
      <div className="mb-[12px] mt-[17px] text-gray-500">{EmptyText[category]}</div>
    </div>
  );
};
