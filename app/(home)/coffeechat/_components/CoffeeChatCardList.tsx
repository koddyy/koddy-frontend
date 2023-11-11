import Link from "next/link";
import useGetCoffeeChatList from "@/apis/coffeechat/hooks/useGetCoffeeChatList";
import { CoffeeChatCard } from "@/app/(home)/coffeechat/_components/CoffeeChatCard/CoffeeChatCard";
import { UserType } from "@/types/user";

interface CoffeeChatCardListProps {
  userType: UserType;
}

export const CoffeeChatCardList = ({ userType }: CoffeeChatCardListProps) => {
  const { data: coffeeChatList } = useGetCoffeeChatList();

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
