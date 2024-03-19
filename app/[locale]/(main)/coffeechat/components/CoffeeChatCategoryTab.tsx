import { useTranslations } from "next-intl";
import qs from "querystring";
import { CoffeeChatCategoryOptions } from "@/constants/coffeechat";
import { Link, usePathname } from "@/libs/navigation";
import { cn } from "@/utils/cn";
import { useActiveCategoryAndStatus } from "../hooks/useActiveCategoryAndStatus";

export const CoffeeChatCategoryTab = () => {
  const t = useTranslations("coffeechat");

  const pathname = usePathname();
  const { activeCategory } = useActiveCategoryAndStatus();

  return (
    <div className="body-2 flex w-full border-b border-b-gray-300 text-gray-600">
      {CoffeeChatCategoryOptions.map((key) => (
        <Link
          key={key}
          href={`${pathname}?${qs.stringify({ category: key })}`}
          className={cn(
            "basis-1/3 py-4 text-center",
            activeCategory === key && "border-b-[3px] border-b-primary font-bold text-primary"
          )}
        >
          {t(`category.${key}`)}
        </Link>
      ))}
    </div>
  );
};
