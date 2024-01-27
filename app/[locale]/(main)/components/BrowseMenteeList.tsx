import Link from "next/link";
import { useGetMenteeList } from "@/apis/user/hooks/useGetMenteeList";
import { GetMenteeListRequest } from "@/apis/user/types";
import { UserCard } from "@/app/[locale]/(main)/components/UserCard";
import ArrowDown from "@/assets/arrow_down.svg";
import Refresh from "@/assets/refresh.svg";
import { Divider } from "@/components/Divider";
import { Tag } from "@/components/Tag";
import { Nationality } from "@/constants/nationality";
import { useIntersect } from "@/hooks/useIntersect";
import { useToggle } from "@/hooks/useToggle";
import { useTypedSearchParams } from "@/hooks/useTypedSearchParams";
import { NationCode } from "@/types/user";
import { MenteeFilterBottomSheet } from "./MenteeFilterBottomSheet";

export const BrowseMenteeList = () => {
  const [isOpenFilterBottomSheet, toggleOpenFilterBottomSheet] = useToggle();
  const { searchParams, setSearchParams } = useTypedSearchParams<GetMenteeListRequest>();

  const params = {
    nationalities: searchParams.getAll("nationalities") ?? [],
    languages: searchParams.getAll("languages") ?? [],
  };

  const { data: menteeList, fetchNextPage, hasNextPage, isFetching } = useGetMenteeList(1, params);

  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const handleSelectFilters = (nationality: Nationality | null, languages: NationCode[]) => {
    setSearchParams({ nationalities: nationality ? [nationality] : [], languages });
    toggleOpenFilterBottomSheet();
  };

  const resetSelectedFilters = () => {
    setSearchParams({ nationalities: [], languages: [] });
  };

  const nationalityCount = searchParams.getAll("nationalities")?.length ?? 0;
  const languagesCount = searchParams.getAll("languages")?.length ?? 0;

  return (
    <>
      <div className="mb-[12px] mt-[14px] flex">
        {(nationalityCount > 0 || languagesCount > 0) && (
          <>
            <button
              className="flex items-center justify-center rounded-full border border-gray-300 p-[6px]"
              onClick={resetSelectedFilters}
            >
              <Refresh width={20} height={20} />
            </button>
            <Divider direction="vertical" className=" mx-[10px] h-[32px] border-gray-200" />
          </>
        )}
        <div className="flex gap-[8px]">
          <Tag
            variant="outline"
            color="grayscale"
            className="body-3"
            rightContent={<ArrowDown width={16} height={16} />}
            onClick={toggleOpenFilterBottomSheet}
          >
            국적
            {nationalityCount > 0 && (
              <span className="body-3-bold text-primary-dark">{`(${nationalityCount})`}</span>
            )}
          </Tag>
          <Tag
            variant="outline"
            color="grayscale"
            className="body-3"
            rightContent={<ArrowDown width={16} height={16} />}
            onClick={toggleOpenFilterBottomSheet}
          >
            언어
            {languagesCount > 0 && (
              <span className="body-3-bold text-primary-dark">{`(${languagesCount})`}</span>
            )}
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-[0.81rem]">
        {menteeList.map((mentee) => (
          <Link key={mentee.id} href={`/profile/${mentee.id}`}>
            <UserCard role="mentee" {...mentee} />
          </Link>
        ))}
        <div ref={ref} />
      </div>
      {isOpenFilterBottomSheet && (
        <MenteeFilterBottomSheet
          initial={params}
          onSelectFilter={handleSelectFilters}
          onClose={toggleOpenFilterBottomSheet}
        />
      )}
    </>
  );
};
