import Link from "next/link";
import useGetCoffeeChatList from "@/apis/coffeechat/hooks/useGetCoffeeChatList";
import { CoffeeChatCard } from "@/app/[locale]/(main)/coffeechat/components/CoffeeChatCard/CoffeeChatCard";
import { Role } from "@/types/user";

interface CoffeeChatCardListProps {
  userRole: Role;
}

export const CoffeeChatCardList = ({ userRole }: CoffeeChatCardListProps) => {
  const { data: coffeeChatList } = useGetCoffeeChatList();

  return (
    <>
      {coffeeChatList.map(({ applicationId, status, mentee, mentor }) => {
        const user = userRole === "mentor" ? mentee : mentor;
        return (
          <Link key={applicationId} href={`/coffeechat/${applicationId}`}>
            <CoffeeChatCard userRole={userRole} status={status} {...user} />
          </Link>
        );
      })}
    </>
  );
};
