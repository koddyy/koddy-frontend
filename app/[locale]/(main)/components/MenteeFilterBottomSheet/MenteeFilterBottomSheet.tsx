import { useTranslations } from "next-intl";
import { useState } from "react";
import Close from "@/assets/close.svg";
import Refresh from "@/assets/refresh.svg";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { languagesOptions } from "@/constants/language";
import { NationalityImage, NationalityOptions } from "@/constants/nationality";
import { Nationality, NationCode } from "@/types/user";
import { cn } from "@/utils/cn";

export type Filter = "nationality" | "language";

const FilterOptions = ["nationality", "language"] as const;

interface MenteeFilterBottomSheetProps {
  initial: {
    nationalities?: Nationality[];
    languages?: NationCode[];
  };
  initialFilter: Filter;
  onSelectFilter: (nationality: Nationality | null, languages: Array<NationCode>) => void;
  onClose: () => void;
}

export const MenteeFilterBottomSheet = ({
  initial,
  initialFilter,
  onSelectFilter,
  onClose,
}: MenteeFilterBottomSheetProps) => {
  const t = useTranslations("home.filters");
  const constants = useTranslations("constants");

  const [activeFilter, setActiveFilter] = useState<Filter>(initialFilter);
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
    if (nationality === null && languages.size === 0) {
      onClose();
      return;
    }

    onSelectFilter(nationality, [...languages]);
  };

  return (
    <BottomSheet>
      <div className="flex gap-[20px] pb-[22px] pt-[17px]">
        {FilterOptions.map((option) => (
          <button
            key={option}
            className={cn("body-1-bold text-gray-400", activeFilter === option && "text-gray-700")}
            type="button"
            onClick={() => setActiveFilter(option)}
          >
            {t(option)}
          </button>
        ))}
      </div>
      {activeFilter === "nationality" && (
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
      {activeFilter === "language" && (
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
