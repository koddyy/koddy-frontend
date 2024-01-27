import { useState } from "react";
import Close from "@/assets/close.svg";
import Refresh from "@/assets/refresh.svg";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { languagesOptions, NationCodeText } from "@/constants/language";
import { Nationality, NationalityImage, NationalityOptions } from "@/constants/nationality";
import { NationCode } from "@/types/user";
import { cn } from "@/utils/cn";

type Filter = "국적" | "언어";

const FilterOptions = ["국적", "언어"] as const;

interface MenteeFilterBottomSheetProps {
  onSelectFilter: (nationality: Nationality | null, languages: Array<NationCode>) => void;
  onClose: () => void;
}

export const MenteeFilterBottomSheet = ({
  onSelectFilter,
  onClose,
}: MenteeFilterBottomSheetProps) => {
  const [activeTab, setActiveTab] = useState<Filter>("국적");
  const [nationality, setNationality] = useState<Nationality | null>(null);
  const [languages, setLanguages] = useState<Set<NationCode>>(new Set([]));

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
            className={cn("body-1-bold text-gray-400", activeTab === option && "text-gray-700")}
            type="button"
            onClick={() => setActiveTab(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {activeTab === "국적" && (
        <div className="mb-[20px] grid grid-flow-col grid-cols-2 grid-rows-5">
          {NationalityOptions.map((nationality) => (
            <button
              key={nationality}
              className="flex items-center justify-start gap-[6px] border-b border-b-gray-100 py-[12px]"
              type="button"
              onClick={() => addNationality(nationality)}
            >
              <img src={NationalityImage[nationality]} />
              {nationality}
            </button>
          ))}
          {Array.from(Array(10 - NationalityOptions.length)).map((_, i) => (
            <div className="border-b border-b-gray-100" key={i} />
          ))}
        </div>
      )}
      {activeTab === "언어" && (
        <div className="mb-[20px] grid grid-flow-row grid-cols-2 grid-rows-5">
          {languagesOptions.map(([code, text]) => (
            <button
              key={code}
              className="flex items-center justify-start gap-[6px] border-b border-b-gray-100 py-[12px]"
              type="button"
              onClick={() => addLanguage(code)}
            >
              {text}
            </button>
          ))}
          {Array.from(Array(10 - languagesOptions.length)).map((_, i) => (
            <div key={i} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-[8px]">
        {nationality && (
          <Tag rightContent={<Close className="h-[18px] w-[18px]" />} onClick={deleteNationality}>
            {nationality}
          </Tag>
        )}
        {[...languages].map((option) => (
          <Tag
            key={option}
            rightContent={<Close className="h-[18px] w-[18px]" />}
            onClick={() => deleteLanguage(option)}
          >
            {NationCodeText[option]}
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
          <Refresh />
          초기화
        </Button>
        <Button fullWidth={false} className="grow-[4]" onClick={selectFilter}>
          결과 보기
        </Button>
      </div>
    </BottomSheet>
  );
};