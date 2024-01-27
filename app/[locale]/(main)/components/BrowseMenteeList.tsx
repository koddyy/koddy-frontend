import Link from "next/link";
import { useGetMenteeList } from "@/apis/user/hooks/useGetMenteeList";
import { GetMenteeListRequest } from "@/apis/user/types";
import { UserCard } from "@/app/[locale]/(main)/components/UserCard";
import ArrowDown from "@/assets/arrow_down.svg";
import { Tag } from "@/components/Tag";
import { Nationality } from "@/constants/nationality";
import { useToggle } from "@/hooks/useToggle";
import { useTypedSearchParams } from "@/hooks/useTypedSearchParams";
import { NationCode } from "@/types/user";
import { MenteeFilterBottomSheet } from "./MenteeFilterBottomSheet";

export const BrowseMenteeList = () => {
  const [isOpenFilterBottomSheet, toggleOpenFilterBottomSheet] = useToggle();
  const { searchParams, setSearchParams } = useTypedSearchParams<GetMenteeListRequest>();
  const { data: menteeList } = useGetMenteeList({
    page: 1,
    nationalities: searchParams.getAll("nationalities"),
    languages: searchParams.getAll("languages"),
  });

  const handleSelectFilter = (nationality: Nationality | null, languages: NationCode[]) => {
    setSearchParams({ nationalities: nationality ? [nationality] : [], languages });
    toggleOpenFilterBottomSheet();
  };
  return (
    <>
      <div className="mb-[12px] mt-[14px] flex gap-[8px]">
        <Tag
          variant="outline"
          color="grayscale"
          className="body-3"
          rightContent={<ArrowDown width={16} height={16} />}
          onClick={toggleOpenFilterBottomSheet}
        >
          국적
        </Tag>
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
        {menteeList.result.map((mentee) => (
          <Link key={mentee.id} href={`/profile/${mentee.id}`}>
            <UserCard role="mentee" {...mentee} />
          </Link>
        ))}
      </div>
      {isOpenFilterBottomSheet && (
        <MenteeFilterBottomSheet
          onSelectFilter={handleSelectFilter}
          onClose={toggleOpenFilterBottomSheet}
        />
      )}
    </>
  );
};
