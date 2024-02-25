/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCoffeeChatListWithMenteeByCategoryAndStatus } from "@/apis/coffeechat/hooks/useGetCoffeeChatListWithMenteeByCategoryAndStatus";
import { useGetCoffeeChatListWithMentorByCategoryAndStatus } from "@/apis/coffeechat/hooks/useGetCoffeeChatListWithMentorByCategoryAndStatus";
import ArrowRight from "@/assets/arrow-right.svg";
import { Button } from "@/components/Button";
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
              >
                {(status === "MENTEE_APPLY" || status === "MENTEE_PENDING") && (
                  <Button className="body-2-bold mt-[8px] flex h-[40px] items-center justify-center gap-[2px] rounded-[8px]">
                    {status === "MENTEE_APPLY" && "수락하기"}
                    {status === "MENTEE_PENDING" && "최종 확정하기"}
                    <ArrowRight />
                  </Button>
                )}
              </CoffeeChatCard>
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
      <object
        className="h-[136px] w-[165px] opacity-60"
        data="/images/illustration_no_coffee_chat.svg"
      />
      <div className="mb-[12px] mt-[17px] text-gray-500">{EmptyText[category]}</div>
    </div>
  );
};
