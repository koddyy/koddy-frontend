"use client";

import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { CoffeeChatCardListWithMentor } from "@/app/[locale]/(main)/coffeechat/components/CoffeeChatCardList";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Divider } from "@/components/Divider";
import { Spinner } from "@/components/Spinner";
import { CoffeeChatStatusOptions } from "@/constants/coffeechat";
import { CoffeeChatCategoryTab } from "../../components/CoffeeChatCategoryTab";
import { CoffeeChatStatusFilter } from "../../components/CoffeeChatStatusFilter";
import { CoffeeChatSteps } from "../../components/CoffeeChatSteps";
import { useActiveCategoryAndStatus } from "../../hooks/useActiveCategoryAndStatus";

const Page = () => {
  const { data: me } = useGetMe();

  const { activeCategory, activeStatus } = useActiveCategoryAndStatus();

  if (!me) return null;

  return (
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
          <CoffeeChatCardListWithMentor category={activeCategory} detail={activeStatus} />
        </SSRSafeSuspense>
      </div>
    </>
  );
};

export default Page;
