import Link from "next/link";
import { useGetNewSuggestedCoffeeChatList } from "@/apis/coffeechat/hooks/useGetNewSuggestedCoffeeChatList";
import ArrowRight from "@/assets/arrow_right.svg";
import { Carousel } from "@/components/Carousel";
import { Divider } from "@/components/Divider";
import { PATH } from "@/constants/path";
import { cn } from "@/utils/cn";
import { UserCard } from "../UserCard";

export const NewSuggestedCoffeeChatList = () => {
  const { data: newCoffeeChatList } = useGetNewSuggestedCoffeeChatList();

  if (newCoffeeChatList.result.length === 0) return;

  return (
    <>
      <div className="mb-3 flex justify-between">
        <div className="subheading-bold">
          커피챗 제안 온 멘토가
          <span className="text-primary"> {`${newCoffeeChatList.totalCount}명 `}</span>
          있어요
        </div>
        <Link
          href={PATH.COFFEECHAT + "?category=suggested&status=apply"}
          className="body-3 flex items-center text-gray-600"
        >
          더보기
          <ArrowRight width={20} heigth={20} />
        </Link>
      </div>
      <div className="mb-4">
        <Carousel loop={false} slides={{ perView: "auto", spacing: 20 }}>
          {newCoffeeChatList.result.map((user) => {
            return (
              <Link
                href={`/coffeechat/${user.id}`}
                key={user.id}
                className={cn(
                  "min-w-[70%] max-w-[70%]",
                  newCoffeeChatList.result.length === 1 && "min-max-full min-w-full"
                )}
              >
                <UserCard role="mentor" {...user} />
              </Link>
            );
          })}
        </Carousel>
      </div>
      <Divider className="border-[4px]" />
    </>
  );
};
