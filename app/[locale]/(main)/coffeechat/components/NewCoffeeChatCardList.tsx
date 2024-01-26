import Link from "next/link";
import useGetNewCoffeeChatList from "@/apis/coffeechat/hooks/useGetNewCoffeeChatList";
import { Role } from "@/types/user";
import { CoffeeChatCard } from "./CoffeeChatCard/";

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
            <CoffeeChatCard status={status} {...user} />
          </Link>
        );
      })}
    </>
  );
};
