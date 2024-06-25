import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Close from "@/assets/close.svg";
import Refresh from "@/assets/refresh.svg";
import { BottomSheet, BottomSheetProps } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { NATIONALITY_IMAGE } from "@/constants/nationality";
import { LANGUAGE_OPTIONS, NATIONALITY_OPTIONS } from "@/constants/user";
import { Language, Nationality } from "@/types/user";
import { cn } from "@/utils/cn";
import { Filter } from "../../../../components/BrowseUserFilter";
import { FILTER_OPTIONS } from "../BrowseMenteeList";

interface MenteeFilterBottomSheetProps extends BottomSheetProps {
  initial: {
    nationalities?: Nationality[];
    languages?: Language[];
  };
  initialFilter: Filter | null;
  onSelectFilter: (nationality: Nationality | null, languages: Array<Language>) => void;
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
  const [languages, setLanguages] = useState<Set<Language>>(new Set(initial.languages ?? []));

  const addNationality = (nationality: Nationality) => {
    setNationality(nationality);
  };

  const addLanguage = (language: Language) => {
    setLanguages((prev) => {
      const copy = new Set(prev);
      copy.add(language);
      return copy;
    });
  };

  const deleteNationality = () => {
    setNationality(null);
  };

  const deleteLanguage = (option: Language) => {
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
      <div className="flex gap-[20px] pb-[10px] pt-[16px]">
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
      <div className="mb-[23px]">
        {selectedFilter === "nationalities" && (
          <div className="grid grid-flow-row grid-cols-2 grid-rows-3">
            {NATIONALITY_OPTIONS.map((option, i) => (
              <button
                key={option}
                className={cn(
                  "body-2 flex items-center justify-start gap-[6px] py-[12px]",
                  nationality === option && "body-2-bold",
                  Math.floor(i / 2) < 2 && "border-b border-b-gray-100"
                )}
                type="button"
                onClick={() => addNationality(option)}
              >
                <img src={NATIONALITY_IMAGE[option]} />
                {constants(`nationality-options.${option}`)}
              </button>
            ))}
          </div>
        )}
        {selectedFilter === "languages" && (
          <div className="grid grid-flow-row grid-cols-2 grid-rows-3">
            {LANGUAGE_OPTIONS.map((option, i) => (
              <button
                key={option}
                className={cn(
                  "body-2 flex items-center justify-start gap-[6px] py-[12px]",
                  languages.has(option) && "body-2-bold",
                  Math.floor(i / 2) < 2 && "border-b border-b-gray-100"
                )}
                type="button"
                onClick={() => addLanguage(option)}
              >
                {constants(`languages-options.${option}`)}
              </button>
            ))}
          </div>
        )}
      </div>
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
