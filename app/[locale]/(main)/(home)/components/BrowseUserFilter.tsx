import { useTranslations } from "next-intl";
import ArrowDown from "@/assets/arrow_down.svg";
import Refresh from "@/assets/refresh.svg";
import { Divider } from "@/components/Divider";
import { Tag } from "@/components/Tag";
import { useTypedSearchParams } from "@/hooks/useTypedSearchParams";
import { Nationality, NationCode } from "@/types/user";

export type Filter = "nationalities" | "languages";

interface BrowseUserFilterProps {
  options: Filter[];
  onSelectFilterBottomSheet: (filter: Filter) => void;
}

export const BrowseUserFilter = ({ options, onSelectFilterBottomSheet }: BrowseUserFilterProps) => {
  const t = useTranslations("home");

  const { searchParams, setSearchParams } = useTypedSearchParams<{
    nationalities: Nationality[];
    languages: NationCode[];
  }>();

  const counts = {
    nationalities: searchParams.getAll("nationalities")?.length ?? 0,
    languages: searchParams.getAll("languages")?.length ?? 0,
  };

  const resetSelectedFilters = () => {
    setSearchParams({ nationalities: [], languages: [] });
  };

  return (
    <>
      <div className="mb-[12px] mt-[14px] flex">
        {(counts.nationalities > 0 || counts.languages > 0) && (
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
        <div className="flex gap-[8px]">
          {options.map((option) => (
            <Tag
              key={option}
              variant="outline"
              color="grayscale"
              className="body-3"
              rightContent={<ArrowDown width={16} height={16} />}
              onClick={() => onSelectFilterBottomSheet(option)}
            >
              {t(`filters.${option}`)}
              {counts[option] > 0 && (
                <span className="body-3-bold text-primary-dark">{`(${counts[option]})`}</span>
              )}
            </Tag>
          ))}
        </div>
      </div>
    </>
  );
};
