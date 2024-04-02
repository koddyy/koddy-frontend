import { useTranslations } from "next-intl";
import qs from "querystring";
import { Select } from "@/components/Select";
import { Link, usePathname } from "@/libs/navigation";
import { PassedCoffeeChatStatusList, WaitingCoffeeChatStatusList } from "@/types/coffeechat";
import { useActiveCategoryAndStatus } from "../hooks/useActiveCategoryAndStatus";

interface CoffeeChatStatusFilterProps {
  options: typeof WaitingCoffeeChatStatusList | typeof PassedCoffeeChatStatusList;
}

export const CoffeeChatStatusFilter = ({ options }: CoffeeChatStatusFilterProps) => {
  const t = useTranslations("coffeechat");

  const pathname = usePathname();
  const { activeCategory, activeStatus } = useActiveCategoryAndStatus();

  return (
    <Select
      className="body-3-bold flex w-fit gap-[2px] rounded-[24px] px-[10px] py-[6px] text-gray-600"
      dropdownClassName="top-[40px] w-[80px] shadow-none text-gray-600"
      options={["all", ...options]}
      value={activeStatus ?? "all"}
      renderValue={(value) => value && `${t(`filters.${value}`)}`}
      renderOption={(value) => (
        <Link
          className="body-3-bold block w-full"
          href={`${pathname}?${qs.stringify({
            status: value === "all" ? undefined : value,
            category: activeCategory,
          })}`}
        >
          {t(`filters.${value}`)}
        </Link>
      )}
    />
  );
};
