import { useState } from "react";
import Close from "@/assets/close.svg";
import Refresh from "@/assets/refresh.svg";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { languagesOptions, NationCodeText } from "@/constants/language";
import { Nationality } from "@/constants/nationality";
import { NationCode } from "@/types/user";

export const MentorFilterBottomSheet = () => {
  const [languages, setLanguages] = useState<Set<NationCode> | null>(null);

  const addLanguage = (language: NationCode) => {
    setLanguages((prev) => {
      const copy = new Set(prev);
      copy.add(language);
      return copy;
    });
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
    setLanguages(null);
  };

  return (
    <BottomSheet>
      <div className="flex gap-[20px] pb-[22px] pt-[17px]">
        <span className={"body-1-bold text-gray-700"}>언어</span>
      </div>
      <div className="mb-[20px] grid grid-flow-row grid-cols-2 grid-rows-3">
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
        {Array.from(Array(6 - languagesOptions.length)).map((_, i) => (
          <div className="border-b border-gray-100" key={i} />
        ))}
      </div>
      <div className="flex flex-wrap gap-[8px]">
        {[...(languages ?? [])].map((option) => (
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
        <Button fullWidth={false} className="grow-[4]">
          결과 보기
        </Button>
      </div>
    </BottomSheet>
  );
};
