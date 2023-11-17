import Link from "next/link";
import useGetNewCoffeeChatList from "@/apis/coffeechat/hooks/useGetNewCoffeeChatList";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { UserCard } from "@/app/(main)/components/UserCard";

export const NewCoffeeChatList = () => {
  const { data: me } = useGetMe();
  const { data: newCoffeeChatList } = useGetNewCoffeeChatList();

  if (!me) return;

  const isMentor = me.mentorYn === "Y";
  const isMentee = me.mentorYn === "N";

  return (
    newCoffeeChatList.length > 0 && (
      <>
        <div className="subheading-bold mb-3">
          {isMentor && "예약을 신청한 멘티가 있어요"}
          {isMentee && "제안 온 커피챗"}
        </div>
        <div className="mb-4 flex flex-col gap-[0.81rem]">
          {newCoffeeChatList.map(({ applicationId, mentee, mentor }) => {
            const user = me.mentorYn === "Y" ? mentee : mentor;
            return (
              <Link href={`/coffeechat/${applicationId}`} key={applicationId}>
                <UserCard {...user} />
              </Link>
            );
          })}
        </div>
      </>
    )
  );
};
