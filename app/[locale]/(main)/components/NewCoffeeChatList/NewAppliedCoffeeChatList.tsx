import Link from "next/link";
import { useGetNewAppliedCoffeeChatList } from "@/apis/coffeechat/hooks/useGetNewAppliedCoffeeChatList";
import ArrowRight from "@/assets/arrow_right.svg";
import { Carousel } from "@/components/Carousel";
import { Divider } from "@/components/Divider";
import { PATH } from "@/constants/path";
import { cn } from "@/utils/cn";
import { UserCard } from "../UserCard";

export const NewAppliedCoffeeChatList = () => {
  const { data: newCoffeeChatList } = useGetNewAppliedCoffeeChatList();

  if (newCoffeeChatList.result.length === 0) return;

  return (
    <>
      <div className="mb-3 flex justify-between">
        <div className="subheading-bold">
          예약을 신청한 멘티가
          <span className="text-primary"> {`${newCoffeeChatList.totalCount}명 `}</span>
          있어요
        </div>
        <Link
          href={PATH.COFFEECHAT + "?category=applied&status=apply"}
          className="body-3 flex items-center text-gray-600"
        >
          더보기
          <ArrowRight width={20} height={20} />
        </Link>
      </div>
      <div className="mb-4">
        <Carousel loop={false} slides={{ perView: "auto", spacing: 20 }}>
          {newCoffeeChatList.result
            .map((user) => {
              return (
                <Link
                  href={`/coffeechat/${user.id}`}
                  key={user.id}
                  className={cn(
                    "min-w-[70%] max-w-[70%]",
                    newCoffeeChatList.result.length === 1 && "min-max-full min-w-full"
                  )}
                >
                  <UserCard role="mentee" {...user} />
                </Link>
              );
            })
            .concat(
              newCoffeeChatList.totalCount > 3 ? (
                <Link
                  key="more"
                  className={cn(
                    "flex min-w-[70%] max-w-[70%] items-center justify-center rounded-xl bg-gray-100"
                  )}
                  href={PATH.COFFEECHAT + "?category=applied&status=apply"}
                >
                  <div className="subheading-bold flex items-center gap-[4px]">
                    <span>더보기</span>
                    <ArrowRight width={24} height={24} />
                  </div>
                </Link>
              ) : (
                []
              )
            )}
        </Carousel>
      </div>
      <Divider className="border-[4px]" />
    </>
  );
};
