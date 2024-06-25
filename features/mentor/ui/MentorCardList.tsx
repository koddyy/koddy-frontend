import { useGetMentorList } from "@/apis/user/hooks/useGetMentorList";
import { GetMentorListRequest } from "@/apis/user/types";
import { UserCard } from "@/components/UserCard";
import { PATH } from "@/constants/path";
import { useIntersect } from "@/hooks/useIntersect";
import { Link } from "@/libs/navigation";

interface MentorCardListProps {
  params: Pick<GetMentorListRequest, "languages">;
}

export const MentorCardList = ({ params }: MentorCardListProps) => {
  const { data: mentorList, fetchNextPage, hasNextPage, isFetching } = useGetMentorList(1, params);

  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  return (
    <div className="flex flex-col gap-[13px]">
      {mentorList.map((mentor) => (
        <Link key={mentor.id} href={`${PATH.PROFILE_MENTOR}/${mentor.id}`}>
          <UserCard role="mentor" {...mentor} />
        </Link>
      ))}
      <div ref={ref} />
    </div>
  );
};
