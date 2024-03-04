"use client";

import { useTranslations } from "next-intl";
import qs from "querystring";
import {
  CoffeeChatCardListWithMentee,
  CoffeeChatCardListWithMentor,
} from "@/app/[locale]/(main)/coffeechat/components/CoffeeChatCardList";
import { GoToLogin } from "@/app/components/GoToLogin";
import { Header } from "@/app/components/Header";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Divider } from "@/components/Divider";
import { Select } from "@/components/Select";
import { Spinner } from "@/components/Spinner";
import { CoffeeChatCategoryOptions, CoffeeChatStatusOptions } from "@/constants/coffeechat";
import { useAuth } from "@/hooks/useAuth";
import { Link, usePathname } from "@/libs/navigation";
import {
  isValidCoffeeChatCategory,
  isValidPassedCoffeChatStatus,
  isValidWaitingCoffeeChatStatus,
} from "@/types/coffeechat";
import { cn } from "@/utils/cn";
import { getEntries } from "@/utils/object";
import { CoffeeChatSteps } from "./components/CoffeeChatSteps";

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
  const activeFilter = (() => {
    if (activeCategory === "waiting" && isValidWaitingCoffeeChatStatus(searchParams.status)) {
      return searchParams.status;
    } else if (activeCategory === "passed" && isValidPassedCoffeChatStatus(searchParams.status)) {
      return searchParams.status;
    }
    return;
  })();

  const { isLoading, isAuthenticated, me } = useAuth();

  if (isLoading) return null;

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <>
          <div className="my-[18px] px-[20px]">
            <CoffeeChatSteps role={me.role} />
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
                options={["all", ...CoffeeChatStatusOptions[activeCategory]]}
                value={activeFilter ?? "all"}
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
            )}
            <SSRSafeSuspense fallback={<Spinner className="mx-auto mt-[46px]" />}>
              {me.role === "mentor" && (
                <CoffeeChatCardListWithMentee category={activeCategory} detail={activeFilter} />
              )}
              {me.role === "mentee" && (
                <CoffeeChatCardListWithMentor category={activeCategory} detail={activeFilter} />
              )}
            </SSRSafeSuspense>
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
