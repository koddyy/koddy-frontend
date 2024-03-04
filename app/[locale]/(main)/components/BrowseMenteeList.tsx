import { useState } from "react";
import { GetMenteeListRequest } from "@/apis/user/types";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Spinner } from "@/components/Spinner";
import { useTypedSearchParams } from "@/hooks/useTypedSearchParams";
import { Nationality, NationCode } from "@/types/user";
import { BrowseUserFilter, Filter } from "./BrowseUserFilter";
import { MenteeCardList } from "./MenteeCardList";
import { MenteeFilterBottomSheet } from "./MenteeFilterBottomSheet";

export const FILTER_OPTIONS: Filter[] = ["nationalities", "languages"];

export const BrowseMenteeList = () => {
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const { searchParams, setSearchParams } = useTypedSearchParams<GetMenteeListRequest>();

  const params = {
    nationalities: searchParams.getAll("nationalities") ?? [],
    languages: searchParams.getAll("languages") ?? [],
  };

  const handleSelectFilters = (nationality: Nationality | null, languages: NationCode[]) => {
    setSearchParams({ nationalities: nationality ? [nationality] : [], languages });
    setSelectedFilter(null);
  };

  return (
    <>
      <BrowseUserFilter options={FILTER_OPTIONS} onSelectFilterBottomSheet={setSelectedFilter} />
      <SSRSafeSuspense fallback={<Spinner className="mx-auto mt-[46px]" />}>
        <MenteeCardList
          params={{ nationalities: params.nationalities, languages: params.languages }}
        />
      </SSRSafeSuspense>
      <MenteeFilterBottomSheet
        initial={params}
        initialFilter={selectedFilter}
        onSelectFilter={handleSelectFilters}
        isOpen={Boolean(selectedFilter)}
        onClose={() => setSelectedFilter(null)}
      />
    </>
  );
};
