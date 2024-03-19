"use client";

import { CoffeeChatCardListWithMentee } from "@/app/[locale]/(main)/coffeechat/components/CoffeeChatCardList";
import { GoToLogin } from "@/app/components/GoToLogin";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Divider } from "@/components/Divider";
import { Spinner } from "@/components/Spinner";
import { CoffeeChatStatusOptions } from "@/constants/coffeechat";
import { useAuth } from "@/hooks/useAuth";
import { CoffeeChatCategoryTab } from "../../components/CoffeeChatCategoryTab";
import { CoffeeChatStatusFilter } from "../../components/CoffeeChatStatusFilter";
import { CoffeeChatSteps } from "../../components/CoffeeChatSteps";
import { useActiveCategoryAndStatus } from "../../hooks/useActiveCategoryAndStatus";

const Page = () => {
  const { isLoading, isAuthenticated, me } = useAuth();

  const { activeCategory, activeStatus } = useActiveCategoryAndStatus();

  if (isLoading) return null;

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="my-[18px] px-[20px]">
            <CoffeeChatSteps role={me.role} />
          </div>
          <Divider className="border-[4px]" />
          <CoffeeChatCategoryTab />
          <div className="flex flex-col gap-[14px] px-[20px] py-[14px]">
            {(activeCategory === "waiting" || activeCategory === "passed") && (
              <CoffeeChatStatusFilter options={CoffeeChatStatusOptions[activeCategory]} />
            )}
            <SSRSafeSuspense fallback={<Spinner className="mx-auto mt-[46px]" />}>
              <CoffeeChatCardListWithMentee category={activeCategory} detail={activeStatus} />
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
