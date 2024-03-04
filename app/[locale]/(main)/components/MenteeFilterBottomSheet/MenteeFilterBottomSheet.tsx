import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Close from "@/assets/close.svg";
import Refresh from "@/assets/refresh.svg";
import { BottomSheet, BottomSheetProps } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { languagesOptions } from "@/constants/language";
import { NationalityImage, NationalityOptions } from "@/constants/nationality";
import { Nationality, NationCode } from "@/types/user";
import { cn } from "@/utils/cn";
import { FILTER_OPTIONS } from "../BrowseMenteeList";
import { Filter } from "../BrowseUserFilter";

interface MenteeFilterBottomSheetProps extends BottomSheetProps {
  initial: {
    nationalities?: Nationality[];
    languages?: NationCode[];
  };
  initialFilter: Filter | null;
  onSelectFilter: (nationality: Nationality | null, languages: Array<NationCode>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const MenteeFilterBottomSheet = ({
  initial,
  initialFilter,
  onSelectFilter,
  isOpen,
  onClose,
}: MenteeFilterBottomSheetProps) => {
  const t = useTranslations("home.filters");
  const constants = useTranslations("constants");

  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(initialFilter ?? null);
  const [nationality, setNationality] = useState<Nationality | null>(
    initial.nationalities?.[0] ?? null
  );
  const [languages, setLanguages] = useState<Set<NationCode>>(new Set(initial.languages ?? []));

  const addNationality = (nationality: Nationality) => {
    setNationality(nationality);
  };

  const addLanguage = (language: NationCode) => {
    setLanguages((prev) => {
      const copy = new Set(prev);
      copy.add(language);
      return copy;
    });
  };

  const deleteNationality = () => {
    setNationality(null);
  };

  const deleteLanguage = (option: NationCode) => {
    if (languages?.has(option)) {
      setLanguages((prev) => {
        const copy = new Set(prev);
        copy.delete(option);
        return copy;
      });
    }
  };

  const resetOptions = () => {
    setNationality(null);
    setLanguages(new Set([]));
  };

  const selectFilter = () => {
    onSelectFilter(nationality, [...languages]);
  };

  useEffect(() => {
    /** @NOTE 컴포넌트가 언마운트 되지 않으므로 상위 컴포넌트와 상태 동기화 필요 */
    if (initial.nationalities) {
      setNationality(initial.nationalities[0]);
    }

    if (initial.languages) {
      setLanguages(new Set(initial.languages));
    }

    if (initialFilter) {
      setSelectedFilter(initialFilter);
    }
  }, [initial.nationalities, initial.languages, initialFilter]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-[20px] pb-[22px] pt-[17px]">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            className={cn(
              "body-1-bold text-gray-400",
              selectedFilter === option && "text-gray-700"
            )}
            type="button"
            onClick={() => setSelectedFilter(option)}
          >
            {t(option)}
          </button>
        ))}
      </div>
      {selectedFilter === "nationalities" && (
        <div className="mb-[20px] grid grid-flow-col grid-cols-2 grid-rows-5">
          {NationalityOptions.map(([key]) => (
            <button
              key={key}
              className={cn(
                "body-2 flex items-center justify-start gap-[6px] border-b border-b-gray-100 py-[12px]",
                nationality === key && "body-2-bold"
              )}
              type="button"
              onClick={() => addNationality(key)}
            >
              <img src={NationalityImage[key]} />
              {constants(`nationality-options.${key}`)}
            </button>
          ))}
          {Array.from(Array(10 - NationalityOptions.length)).map((_, i) => (
            <div className="border-b border-b-gray-100" key={i} />
          ))}
        </div>
      )}
      {selectedFilter === "languages" && (
        <div className="mb-[20px] grid grid-flow-row grid-cols-2 grid-rows-5">
          {languagesOptions.map(([code]) => (
            <button
              key={code}
              className={cn(
                "body-2 flex items-center justify-start gap-[6px] border-b border-b-gray-100 py-[12px]",
                languages.has(code) && "body-2-bold"
              )}
              type="button"
              onClick={() => addLanguage(code)}
            >
              {constants(`languages-options.${code}`)}
            </button>
          ))}
          {Array.from(Array(10 - languagesOptions.length)).map((_, i) => (
            <div key={i} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-[8px]">
        {nationality && (
          <Tag rightContent={<Close width={16} height={16} />} onClick={deleteNationality}>
            {constants(`nationality-options.${nationality}`)}
          </Tag>
        )}
        {[...languages].map((option) => (
          <Tag
            key={option}
            rightContent={<Close width={16} height={16} />}
            onClick={() => deleteLanguage(option)}
          >
            {constants(`languages-options.${option}`)}
          </Tag>
        ))}
      </div>
      <div className="flex gap-[8px] pb-[16px] pt-[14px]">
        <Button
          variant="outline"
          fullWidth={false}
          className="body-1 flex grow-[1] items-center justify-center gap-[4px] border-[1px] border-gray-300 text-gray-700"
          onClick={resetOptions}
        >
          <Refresh width={20} height={20} />
          {t("reset")}
        </Button>
        <Button fullWidth={false} className="grow-[4]" onClick={selectFilter}>
          {t("show-results")}
        </Button>
      </div>
    </BottomSheet>
  );
};
