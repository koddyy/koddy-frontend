/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import useGetNewCoffeeChatList from "@/apis/coffeechat/hooks/useGetNewCoffeeChatList";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { UserCard } from "@/app/(main)/components/UserCard";

export const NewCoffeeChatList = () => {
  const { data: me } = useGetMe();
  const { data: newCoffeeChatList } = useGetNewCoffeeChatList();

  if (!me) return;

  return (
    newCoffeeChatList.length > 0 && (
      <>
        <div className="subheading-bold mb-3">
          {me.role === "mentor" && "예약을 신청한 멘티가 있어요"}
          {me.role === "mentee" && "제안 온 커피챗"}
        </div>
        <div className="mb-4 flex flex-col gap-[0.81rem]">
          {newCoffeeChatList.map(({ applicationId }) => {
            // const user = me.role === "mentor" ? mentee : mentor;
            return (
              <Link href={`/coffeechat/${applicationId}`} key={applicationId}>
                {/* <UserCard {...user} /> */}
              </Link>
            );
          })}
        </div>
      </>
    )
  );
};
