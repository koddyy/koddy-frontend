import Link from "next/link";
import { useGetMentorList } from "@/apis/user/hooks/useGetMentorList";
import { GetMentorListRequest } from "@/apis/user/types";
import { UserCard } from "@/app/[locale]/(main)/components/UserCard";
import ArrowDown from "@/assets/arrow_down.svg";
import { Tag } from "@/components/Tag";
import { useToggle } from "@/hooks/useToggle";
import { useTypedSearchParams } from "@/hooks/useTypedSearchParams";
import { NationCode } from "@/types/user";
import { MentorFilterBottomSheet } from "./MentorFilterBottomSheet";

export const BrowseMentorList = () => {
  const [isOpenFilterBottomSheet, toggleOpenFilterBottomSheet] = useToggle();
  const { searchParams, setSearchParams } = useTypedSearchParams<GetMentorListRequest>();
  const { data: mentorList } = useGetMentorList({
    page: 1,
    languages: searchParams.getAll("languages"),
  });

  const handleSelectFilter = (languages: NationCode[]) => {
    setSearchParams({ languages });
    toggleOpenFilterBottomSheet();
  };

  return (
    <>
      <div className="mb-[12px] mt-[14px]">
        <Tag
          variant="outline"
          color="grayscale"
          className="body-3"
          rightContent={<ArrowDown width={16} height={16} />}
          onClick={toggleOpenFilterBottomSheet}
        >
          언어
        </Tag>
      </div>
      <div className="flex flex-col gap-[0.81rem]">
        {mentorList.result.map((mentor) => (
          <Link key={mentor.id} href={`/profile/${mentor.id}`}>
            <UserCard role="mentor" {...mentor} />
          </Link>
        ))}
      </div>
      {isOpenFilterBottomSheet && (
        <MentorFilterBottomSheet
          onSelectFilter={handleSelectFilter}
          onClose={toggleOpenFilterBottomSheet}
        />
      )}
    </>
  );
};
