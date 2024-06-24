import { cva } from "cva";
import { useTranslations } from "next-intl";
import { Tag } from "@/components/Tag";
import { Language } from "@/types/user";
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
    } as Record<Language, string>,
  },
});

interface LanguagesProps {
  mainLanguage: Language;
  subLanguages: Language[];
}

export const Lanuages = ({ mainLanguage, subLanguages }: LanguagesProps) => {
  const constants = useTranslations("constants");

  return (
    <div className="flex gap-[16px]">
      <div>
        <div className="label mb-[4px]">{constants("language-type.main")}</div>
        <Tag variant="solid" color="grayscale">
          <span
            className={cn(
              "body-3-bold mr-[4px]",
              LanguageTextColorVariants({ language: mainLanguage })
            )}
          >
            {capitalize(mainLanguage)}
          </span>
          {constants(`languages-options.${mainLanguage}`)}
        </Tag>
      </div>
      <div className="grow">
        <div className="label mb-[4px]">{constants("language-type.sub")}</div>
        <div className="flex flex-wrap gap-[6px]">
          {subLanguages.map((subLanguage) => {
            return (
              <Tag key={subLanguage} variant="outline" color="grayscale">
                <span
                  className={cn(
                    "body-3-bold mr-[4px]",
                    LanguageTextColorVariants({ language: subLanguage })
                  )}
                >
                  {capitalize(subLanguage)}
                </span>
                {constants(`languages-options.${subLanguage}`)}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
};
