import { GetMentorListRequest } from "@/apis/user/types";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Spinner } from "@/components/Spinner";
import { useToggle } from "@/hooks/useToggle";
import { useTypedSearchParams } from "@/hooks/useTypedSearchParams";
import { NationCode } from "@/types/user";
import { BrowseUserFilter, Filter } from "./BrowseUserFilter";
import { MentorCardList } from "./MentorCardList";
import { MentorFilterBottomSheet } from "./MentorFilterBottomSheet";

export const FILTER_OPTIONS: Filter[] = ["languages"];

export const BrowseMentorList = () => {
  const [isOpenFilterBottomSheet, toggleOpenFilterBottomSheet] = useToggle();
  const { searchParams, setSearchParams } = useTypedSearchParams<GetMentorListRequest>();

  const params = {
    languages: searchParams.getAll("languages") ?? [],
  };

  const handleSelectFilter = (languages: NationCode[]) => {
    setSearchParams({ languages });
    toggleOpenFilterBottomSheet();
  };

  return (
    <>
      <BrowseUserFilter
        options={FILTER_OPTIONS}
        onSelectFilterBottomSheet={() => toggleOpenFilterBottomSheet()}
      />
      <SSRSafeSuspense fallback={<Spinner className="mx-auto mt-[46px]" />}>
        <MentorCardList params={{ languages: params.languages }} />
      </SSRSafeSuspense>
      <MentorFilterBottomSheet
        initial={params}
        onSelectFilter={handleSelectFilter}
        isOpen={isOpenFilterBottomSheet}
        onClose={toggleOpenFilterBottomSheet}
      />
    </>
  );
};
