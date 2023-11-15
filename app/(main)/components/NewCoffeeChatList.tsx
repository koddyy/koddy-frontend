import Link from "next/link";
import useGetNewCoffeeChatList from "@/apis/coffeechat/hooks/useGetNewCoffeeChatList";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { UserCard } from "@/app/(main)/components/UserCard";

export const NewCoffeeChatList = () => {
  const { data: me } = useGetMe();
  const { data: newCoffeeChatList } = useGetNewCoffeeChatList();

  return (
    <div className="flex flex-col gap-[0.81rem]">
      {newCoffeeChatList?.map(({ applicationId, mentee, mentor }) => {
        const user = me?.mentorYn === "Y" ? mentee : mentor;
        return (
          <Link href={`/coffeechat/${applicationId}`} key={applicationId}>
            <UserCard {...user} />
          </Link>
        );
      })}
    </div>
  );
};

const NewCoffeeChatListSkeleton = () => {
  return (
    <div className="flex flex-col gap-[0.81rem]">
      {new Array(1).fill(0).map((_, i) => (
        <UserCard.HorizontalSkeleton key={i} />
      ))}
    </div>
  );
};

NewCoffeeChatList.Skeleton = NewCoffeeChatListSkeleton;
