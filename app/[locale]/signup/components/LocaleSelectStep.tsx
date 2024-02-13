import { useTranslations } from "next-intl";
import { Toggle } from "@/components/Toggle";
import { localesOptions } from "@/constants/locale";
import { SupportLocale } from "@/types/locale";
import { getEntries } from "@/utils/object";

interface LocaleSelectStepProps {
  selectedLocale?: SupportLocale;
  onChangeLocale: (locale: SupportLocale) => void;
}

export const LocaleSelectStep = ({ selectedLocale, onChangeLocale }: LocaleSelectStepProps) => {
  const t = useTranslations("signup.LocaleSelectStep");

  return (
    <div className="px-[20px]">
      <div className="headline-1 mb-[26px] mt-[20px]">
        {t.rich("title", {
          br: () => <br />,
        })}
      </div>
      <div className="flex flex-col gap-[16px]">
        {getEntries(localesOptions).map(([key, value]) => (
          <Toggle
            key={key}
            className="subheading-bold rounded-[16px] border-[2px] p-[16px]"
            variant="outline"
            pressed={selectedLocale === key}
            onChangePressed={() => onChangeLocale(key)}
          >
            {value}
          </Toggle>
        ))}
      </div>
    </div>
  );
};
