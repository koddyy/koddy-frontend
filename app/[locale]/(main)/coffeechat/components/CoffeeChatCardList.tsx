/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCoffeeChatListWithMenteeByCategoryAndStatus } from "@/apis/coffeechat/hooks/useGetCoffeeChatListWithMenteeByCategoryAndStatus";
import { useGetCoffeeChatListWithMentorByCategoryAndStatus } from "@/apis/coffeechat/hooks/useGetCoffeeChatListWithMentorByCategoryAndStatus";
import { useIntersect } from "@/hooks/useIntersect";
import { Link } from "@/libs/navigation";
import {
  CoffeeChatCategory,
  PassedCoffeeChatStatus,
  WaitingCoffeeChatStatus,
} from "@/types/coffeechat";
import { CoffeeChatCard } from "./CoffeeChatCard";

interface CoffeeChatCardListProps {
  category: CoffeeChatCategory;
  detail?: WaitingCoffeeChatStatus | PassedCoffeeChatStatus;
}

export const CoffeeChatCardListWithMentor = ({ category, detail }: CoffeeChatCardListProps) => {
  const {
    data: coffeeChatListWithMentor,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useGetCoffeeChatListWithMentorByCategoryAndStatus({
    page: 1,
    category,
    detail,
  });
  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  if (coffeeChatListWithMentor.length === 0)
    return <Empty category={category === "suggested" ? "mentee-suggested" : category} />;

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        {coffeeChatListWithMentor.map(({ id, status, mentorId, ...mentor }) => {
          return (
            <Link key={id} href={`/coffeechat/${id}`}>
              <CoffeeChatCard
                status={category === "suggested" ? null : status}
                role="mentor"
                {...mentor}
              />
            </Link>
          );
        })}
      </div>
      <div ref={ref} />
    </>
  );
};

export const CoffeeChatCardListWithMentee = ({ category, detail }: CoffeeChatCardListProps) => {
  const {
    data: coffeeChatListWithMentee,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useGetCoffeeChatListWithMenteeByCategoryAndStatus({
    page: 1,
    category,
    detail,
  });
  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  if (coffeeChatListWithMentee.length === 0)
    return <Empty category={category === "suggested" ? "mentor-suggested" : category} />;

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        {coffeeChatListWithMentee.map(({ id, status, menteeId, ...mentee }) => {
          return (
            <Link key={id} href={`/coffeechat/${id}`}>
              <CoffeeChatCard
                status={category === "suggested" ? null : status}
                role="mentee"
                {...mentee}
              />
            </Link>
          );
        })}
      </div>
      <div ref={ref} />
    </>
  );
};

const EmptyText = {
  "mentor-suggested": "제안한 커피챗이 없어요",
  "mentee-suggested": "커피챗 제안이 없어요",
  waiting: "대기중인 커피챗이 없어요",
  scheduled: "예정된 커피챗이 없어요",
  passed: "지난 커피챗이 없어요",
} as const;

const Empty = ({
  category,
}: {
  category: Exclude<CoffeeChatCategory, "suggested"> | "mentor-suggested" | "mentee-suggested";
}) => {
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
