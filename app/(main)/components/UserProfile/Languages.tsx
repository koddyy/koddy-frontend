import { cva } from "cva";
import { Tag } from "@/components/Tag";
import { LanguageCode, NationAndLanguageCodeMapping, NationCodeText } from "@/constants/language";
import { NationCode } from "@/types/user";
import { cn } from "@/utils/cn";
import { capitalize } from "@/utils/string";

export const LanguageTextColorVariants = cva("", {
  variants: {
    language: {
      KO: "text-[#FF3FE0]",
      EN: "text-[#2C79EC]",
      CN: "text-[#F53A3A]",
      JA: "text-[#24CE49]",
      VI: "text-[#F6752D]",
    } as Record<LanguageCode, string>,
  },
});

interface LanguagesProps {
  mainLanguage: NationCode;
  subLanguages: NationCode[];
}

export const Lanuages = ({ mainLanguage, subLanguages }: LanguagesProps) => {
  const mainLanguageCode = NationAndLanguageCodeMapping[mainLanguage];

  return (
    <div className="flex gap-[16px]">
      <div>
        <div className="label mb-[4px]">메인 언어</div>
        <Tag variant="solid" color="grayscale">
          <span
            className={cn(
              "body-3-bold mr-[4px]",
              LanguageTextColorVariants({ language: mainLanguageCode })
            )}
          >
            {capitalize(mainLanguageCode)}
          </span>
          {NationCodeText[mainLanguage]}
        </Tag>
      </div>
      <div className="grow">
        <div className="label mb-[4px]">서브 언어</div>
        <div className="flex flex-wrap gap-[6px]">
          {subLanguages.map((subLanguage) => {
            const subLanguageCode = NationAndLanguageCodeMapping[subLanguage];
            return (
              <Tag key={subLanguage} variant="outline" color="grayscale">
                <span
                  className={cn(
                    "body-3-bold mr-[4px]",
                    LanguageTextColorVariants({ language: subLanguageCode })
                  )}
                >
                  {capitalize(subLanguageCode)}
                </span>
                {NationCodeText[subLanguage]}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
};
