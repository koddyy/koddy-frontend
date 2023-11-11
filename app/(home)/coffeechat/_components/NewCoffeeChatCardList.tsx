import Link from "next/link";
import useGetNewCoffeeChatList from "@/apis/coffeechat/hooks/useGetNewCoffeeChatList";
import { CoffeeChatCard } from "@/app/(home)/coffeechat/_components/CoffeeChatCard/CoffeeChatCard";
import { UserType } from "@/types/user";

interface NewCoffeeChatCardListProps {
  userType: UserType;
}

export const NewCoffeeChatCardList = ({ userType }: NewCoffeeChatCardListProps) => {
  const { data: coffeeChatList } = useGetNewCoffeeChatList();

  return (
    <>
      {coffeeChatList.map(({ applicationId, status, mentee, mentor }) => {
        const user = userType === "mentor" ? mentee : mentor;
        return (
          <Link key={applicationId} href={`/coffeechat/${applicationId}`}>
            <CoffeeChatCard userType={userType} status={status} {...user} />
          </Link>
        );
      })}
    </>
  );
};
