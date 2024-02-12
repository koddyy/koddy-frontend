import { useTranslations } from "next-intl";
import { useGetMentorList } from "@/apis/user/hooks/useGetMentorList";
import { GetMentorListRequest } from "@/apis/user/types";
import { UserCard } from "@/app/[locale]/(main)/components/UserCard";
import ArrowDown from "@/assets/arrow_down.svg";
import Refresh from "@/assets/refresh.svg";
import { Divider } from "@/components/Divider";
import { Tag } from "@/components/Tag";
import { PATH } from "@/constants/path";
import { useIntersect } from "@/hooks/useIntersect";
import { useToggle } from "@/hooks/useToggle";
import { useTypedSearchParams } from "@/hooks/useTypedSearchParams";
import { Link } from "@/libs/navigation";
import { NationCode } from "@/types/user";
import { cn } from "@/utils/cn";
import { MentorFilterBottomSheet } from "./MentorFilterBottomSheet";

export const BrowseMentorList = () => {
  const t = useTranslations("home");

  const [isOpenFilterBottomSheet, toggleOpenFilterBottomSheet] = useToggle();
  const { searchParams, setSearchParams } = useTypedSearchParams<GetMentorListRequest>();

  const params = {
    languages: searchParams.getAll("languages") ?? [],
  };
  const { data: mentorList, fetchNextPage, hasNextPage, isFetching } = useGetMentorList(1, params);

  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const handleSelectFilter = (languages: NationCode[]) => {
    setSearchParams({ languages });
    toggleOpenFilterBottomSheet();
  };

  const resetSelectedFilters = () => {
    setSearchParams({ languages: [] });
  };

  const languagesCount = searchParams.getAll("languages")?.length ?? 0;

  return (
    <>
      <div className="mb-[12px] mt-[14px] flex">
        {languagesCount > 0 && (
          <>
            <button
              className="flex items-center justify-center rounded-full border border-gray-300 p-[6px]"
              onClick={resetSelectedFilters}
            >
              <Refresh width={20} height={20} />
            </button>
            <Divider direction="vertical" className="mx-[10px] h-[32px] border-gray-200" />
          </>
        )}
        <Tag
          variant="outline"
          color="grayscale"
          className={cn("body-3", languagesCount && "shadow-primary")}
          rightContent={<ArrowDown width={16} height={16} />}
          onClick={toggleOpenFilterBottomSheet}
        >
          {t("filters.language")}
          {languagesCount > 0 && (
            <span className="body-3-bold text-primary-dark">{`(${languagesCount})`}</span>
          )}
        </Tag>
      </div>
      <div className="flex flex-col gap-[0.81rem]">
        {mentorList.map((mentor) => (
          <Link key={mentor.id} href={`${PATH.PROFILE_MENTOR}/${mentor.id}`}>
            <UserCard role="mentor" {...mentor} />
          </Link>
        ))}
        <div ref={ref} />
      </div>
      {isOpenFilterBottomSheet && (
        <MentorFilterBottomSheet
          initial={params}
          onSelectFilter={handleSelectFilter}
          onClose={toggleOpenFilterBottomSheet}
        />
      )}
    </>
  );
};
