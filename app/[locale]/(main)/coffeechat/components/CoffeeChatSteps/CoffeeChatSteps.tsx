import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { useGetCoffeeChatCount } from "@/apis/coffeechat/hooks/useGetCoffeeChatCounts";
import ArrowRight from "@/assets/arrow_right.svg";
import { Button } from "@/components/Button";
import { PATH } from "@/constants/path";
import { Link } from "@/libs/navigation";
import { CoffeeChatCategoryList } from "@/types/coffeechat";
import { Role } from "@/types/user";
import { cn } from "@/utils/cn";
import { CoffeeChatStepsDescription } from "./CoffeeChatStepsDescription";

interface CoffeeChatStepsProps {
  role: Role;
}

export const CoffeeChatSteps = ({ role }: CoffeeChatStepsProps) => {
  const t = useTranslations("coffeechat");

  const { data: count } = useGetCoffeeChatCount();

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <Link href={PATH.COFFEECHAT_SUGGEST}>
          <Button
            variant="outline"
            color="grayscale"
            className="body-3 flex items-center justify-between border border-gray-300 text-gray-500"
          >
            {t(`suggested.${role}`)}
            <div className="flex items-center gap-[2px]">
              <span className={cn("headline-2", count?.suggested && "text-primary-dark")}>
                {count?.suggested ?? 0}
              </span>
              <ArrowRight width={24} height={24} />
            </div>
          </Button>
        </Link>
        <div className="flex items-center justify-between rounded-[10px] bg-gray-100 px-[28px] py-[13px] text-gray-500">
          {CoffeeChatCategoryList.map(
            (category, i) =>
              category !== "suggested" && (
                <Fragment key={category}>
                  <div className="text-center">
                    <div className={cn("headline-2", count?.[category] && "text-primary-dark")}>
                      {count?.[category] ?? 0}
                    </div>
                    <div className="label">{t(`category.${category}`)}</div>
                  </div>
                  {i !== CoffeeChatCategoryList.length - 1 && (
                    <ArrowRight width={18} height={18} className="text-gray-500" />
                  )}
                </Fragment>
              )
          )}
        </div>
      </div>
      <div className="mt-[14px] flex items-center justify-end gap-[5px]">
        <CoffeeChatStepsDescription />
      </div>
    </>
  );
};
