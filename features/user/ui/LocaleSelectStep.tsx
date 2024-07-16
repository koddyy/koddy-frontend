import { useTranslations } from "next-intl";
import { FormGroupLabel } from "@/components/FormControl";
import { Radio, RadioGroup } from "@/components/RadioGroup";
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
    <RadioGroup
      className="px-[20px]"
      name="locale"
      value={selectedLocale}
      onChangeValue={(locale) => onChangeLocale(locale as SupportLocale)}
    >
      <FormGroupLabel className="headline-1 mb-[26px] mt-[20px]">
        {t.rich("title", {
          br: () => <br />,
        })}
      </FormGroupLabel>
      <div className="flex flex-col gap-[16px]">
        {getEntries(localesOptions).map(([key, value]) => (
          <Radio
            key={key}
            className="subheading-bold rounded-[16px] border-[2px] p-[16px] text-center"
            variant="outline"
            value={key}
          >
            {value}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
};
