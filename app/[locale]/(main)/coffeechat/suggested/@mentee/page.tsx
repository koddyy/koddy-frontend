"use client";

import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Spinner } from "@/components/Spinner";
import { CoffeeChatCardListWithMentor } from "../../components/CoffeeChatCardList";

const Page = () => {
  const { data: me } = useGetMe();

  if (!me) return null;

  return (
    <div className="px-[20px] py-[16px]">
      <SSRSafeSuspense fallback={<Spinner className="mx-auto mt-[46px]" />}>
        <CoffeeChatCardListWithMentor category="suggested" />
      </SSRSafeSuspense>
    </div>
  );
};

export default Page;
