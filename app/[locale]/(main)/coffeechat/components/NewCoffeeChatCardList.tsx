import Link from "next/link";
import useGetNewCoffeeChatList from "@/apis/coffeechat/hooks/useGetNewCoffeeChatList";
import { CoffeeChatCard } from "@/app/[locale]/(main)/coffeechat/components/CoffeeChatCard/CoffeeChatCard";
import { Role } from "@/types/user";

interface NewCoffeeChatCardListProps {
  userRole: Role;
}

export const NewCoffeeChatCardList = ({ userRole }: NewCoffeeChatCardListProps) => {
  const { data: coffeeChatList } = useGetNewCoffeeChatList();

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
