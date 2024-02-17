"use client";

import { useTranslations } from "next-intl";
import qs from "querystring";
import { Suspense } from "react";
import {
  CoffeeChatCardListWithMentee,
  CoffeeChatCardListWithMentor,
} from "@/app/[locale]/(main)/coffeechat/components/CoffeeChatCardList";
import { GoToLogin } from "@/app/components/GoToLogin";
import { Header } from "@/app/components/Header";
import Close from "@/assets/close.svg";
import InfoCircle from "@/assets/Info_circle.svg";
import { Divider } from "@/components/Divider";
import { Select } from "@/components/Select";
import { Tooltip } from "@/components/Tooltip";
import { CoffeeChatCategoryOptions, CoffeeChatStatusOptions } from "@/constants/coffeechat";
import { useAuth } from "@/hooks/useAuth";
import { useToggle } from "@/hooks/useToggle";
import { Link, usePathname } from "@/libs/navigation";
import {
  isValidCoffeeChatCategory,
  isValidPassedCoffeChatStatus,
  isValidWaitingCoffeeChatStatus,
} from "@/types/coffeechat";
import { cn } from "@/utils/cn";
import { getEntries } from "@/utils/object";
import { CoffeeChatCount } from "./components/CoffeeChatCount";

const Page = ({
  searchParams,
}: {
  searchParams: {
    explore?: string;
    category: string;
    status: string;
  };
}) => {
  const t = useTranslations("coffeechat");

  const pathname = usePathname();
  const activeCategory = isValidCoffeeChatCategory(searchParams.category)
    ? searchParams.category
    : "waiting";
  const activeStatus = (() => {
    if (activeCategory === "waiting" && isValidWaitingCoffeeChatStatus(searchParams.status)) {
      return searchParams.status;
    } else if (activeCategory === "passed" && isValidPassedCoffeChatStatus(searchParams.status)) {
      return searchParams.status;
    }
    return;
  })();
  const [isOpenInfo, toggleIOpenInfoTooltip] = useToggle();

  const { isLoading, isAuthenticated, me } = useAuth();

  if (isLoading) return null;

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <>
          <div className="my-[18px] px-[20px]">
            <CoffeeChatCount role={me.role} />
            <div className="my-[16px] flex items-center justify-end gap-[5px]">
              <Tooltip
                position="bottom-center"
                open={isOpenInfo}
                content={
                  <div className="rounded-[12px] border border-gray-200 bg-white px-[12px] py-[10px] shadow-[2px_4px_8px_0px_#0000001A]">
                    <div className="flex justify-between">
                      <div className="body-3-bold">{t("coffeechat-steps-info.label")}</div>
                      <button type="button" onClick={toggleIOpenInfoTooltip}>
                        <Close className="text-gray-500" width={20} height={20} />
                      </button>
                    </div>
                    <Divider className="my-[8px] mt-[4px] border-gray-200" />
                    <div className="body-3 whitespace-pre">
                      {t("coffeechat-steps-info.description")}
                    </div>
                  </div>
                }
              >
                <InfoCircle
                  className="text-gray-400"
                  width={20}
                  height={20}
                  onClick={toggleIOpenInfoTooltip}
                />
              </Tooltip>
              <div className="text-gray-500">{t("coffeechat-steps-info.label")}</div>
            </div>
          </div>
          <Divider className="border-[4px]" />
          <div className="body-2 flex w-full border-b border-b-gray-300 text-gray-600">
            {getEntries(CoffeeChatCategoryOptions).map(([key]) => (
              <Link
                key={key}
                href={`${pathname}?${qs.stringify({ category: key })}`}
                className={cn(
                  "grow py-4 text-center",
                  activeCategory === key && "border-b-[3px] border-b-primary font-bold text-primary"
                )}
              >
                {t(`category.${key}`)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-[14px] px-[20px] py-[14px]">
            {(activeCategory === "waiting" || activeCategory === "passed") && (
              <Select
                className="body-3-bold flex w-fit gap-[2px] rounded-[24px] px-[10px] py-[6px] text-gray-600"
                dropdownClassName="top-[40px] w-[80px] shadow-none text-gray-600"
                options={["ALL", ...CoffeeChatStatusOptions[activeCategory]]}
                value={activeStatus ?? "ALL"}
                renderValue={(value) => value && `${t(`filters.${value}`)}`}
                renderOption={(value) => (
                  <Link
                    className="body-3-bold block w-full"
                    href={`${pathname}?${qs.stringify({
                      status: value === "ALL" ? undefined : value,
                      category: activeCategory,
                    })}`}
                  >
                    {t(`filters.${value}`)}
                  </Link>
                )}
              />
            )}
            <Suspense>
              {me.role === "mentor" && (
                <CoffeeChatCardListWithMentee category={activeCategory} status={activeStatus} />
              )}
              {me.role === "mentee" && (
                <CoffeeChatCardListWithMentor category={activeCategory} status={activeStatus} />
              )}
            </Suspense>
          </div>
        </>
      ) : (
        <div className="py-[142px]">
          <GoToLogin />
        </div>
      )}
    </>
  );
};

export default Page;
