import Link from "next/link";
import { useGetMenteeList } from "@/apis/user/hooks/useGetMenteeList";
import { UserCard } from "@/app/[locale]/(main)/components/UserCard";

export const BrowseMenteeList = () => {
  const { data: menteeList } = useGetMenteeList({ page: 1 });

  return (
    <>
      <div className="subheading-bold mb-3">멘티 둘러보기</div>
      <div className="flex flex-col gap-[0.81rem]">
        {menteeList.result.map((mentee) => (
          <Link key={mentee.id} href={`/profile/${mentee.id}`}>
            <UserCard role="mentee" {...mentee} />
          </Link>
        ))}
      </div>
    </>
  );
};
