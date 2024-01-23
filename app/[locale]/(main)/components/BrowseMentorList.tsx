import Link from "next/link";
import { useGetMentorList } from "@/apis/user/hooks/useGetMentorList";
import { UserCard } from "@/app/[locale]/(main)/components/UserCard";

export const BrowseMentorList = () => {
  const { data: mentorList } = useGetMentorList();

  return (
    <>
      <div className="subheading-bold mb-3">멘토 둘러보기</div>
      <div className="flex flex-col gap-[0.81rem]">
        {mentorList.map((mentor) => (
          <Link key={mentor.id} href={`/profile/${mentor.id}`}>
            <UserCard {...mentor} />
          </Link>
        ))}
      </div>
    </>
  );
};
