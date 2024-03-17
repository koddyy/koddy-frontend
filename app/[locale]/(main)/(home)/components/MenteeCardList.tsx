import { useGetMenteeList } from "@/apis/user/hooks/useGetMenteeList";
import { GetMenteeListRequest } from "@/apis/user/types";
import { UserCard } from "@/components/UserCard";
import { PATH } from "@/constants/path";
import { useIntersect } from "@/hooks/useIntersect";
import { Link } from "@/libs/navigation";

interface MenteeCardListProps {
  params: Pick<GetMenteeListRequest, "nationalities" | "languages">;
}

export const MenteeCardList = ({ params }: MenteeCardListProps) => {
  const { data: menteeList, fetchNextPage, hasNextPage, isFetching } = useGetMenteeList(1, params);

  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  return (
    <div className="flex flex-col gap-[13px]">
      {menteeList.map((mentee) => (
        <Link key={mentee.id} href={`${PATH.PROFILE_MENTEE}/${mentee.id}`}>
          <UserCard role="mentee" {...mentee} />
        </Link>
      ))}
      <div ref={ref} />
    </div>
  );
};
