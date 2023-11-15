import Link from "next/link";
import { useGetMenteeList } from "@/apis/user/hooks/useGetMenteeList";
import { UserCard } from "@/app/components/UserCard";

export const BrowseMenteeList = () => {
  const { data: menteeList } = useGetMenteeList();

  return (
    <div className="flex flex-col gap-[0.81rem]">
      {menteeList.map((mentee) => (
        <Link key={mentee.userId} href={`/profile/${mentee.userId}`}>
          <UserCard {...mentee} />
        </Link>
      ))}
    </div>
  );
};
