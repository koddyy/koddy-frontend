import { useTranslations } from "next-intl";
import { useState } from "react";
import Close from "@/assets/close.svg";
import Refresh from "@/assets/refresh.svg";
import { BottomSheet } from "@/components/BottomSheet";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { languagesOptions } from "@/constants/language";
import { NationCode } from "@/types/user";
import { cn } from "@/utils/cn";

interface MentorFilterBottomSheetProps {
  initial: {
    languages?: NationCode[];
  };
  onSelectFilter: (languages: Array<NationCode>) => void;
  onClose: () => void;
}

export const MentorFilterBottomSheet = ({
  initial,
  onSelectFilter,
  onClose,
}: MentorFilterBottomSheetProps) => {
  const t = useTranslations("home.filters");
  const constants = useTranslations("constants.languages-options");

  const [languages, setLanguages] = useState<Set<NationCode>>(new Set(initial.languages ?? []));

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
    setLanguages(new Set([]));
  };

  const selectFilter = () => {
    if (languages.size === 0) {
      onClose();
      return;
    }

    onSelectFilter([...languages]);
  };

  return (
    <BottomSheet>
      <div className="flex gap-[20px] pb-[22px] pt-[17px]">
        <span className={"body-1-bold text-gray-700"}>{t("language")}</span>
      </div>
      <div className="mb-[20px] grid grid-flow-row grid-cols-2 grid-rows-3">
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
            {constants(code)}
          </button>
        ))}
        {Array.from(Array(6 - languagesOptions.length)).map((_, i) => (
          <div className="border-b border-gray-100" key={i} />
        ))}
      </div>
      <div className="flex flex-wrap gap-[8px]">
        {[...languages].map((option) => (
          <Tag
            key={option}
            rightContent={<Close width={16} height={16} />}
            onClick={() => deleteLanguage(option)}
          >
            {constants(option)}
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
