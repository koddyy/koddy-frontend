"use client";

import { Suspense, useState } from "react";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { CoffeeChatCardList } from "@/app/[locale]/(main)/coffeechat/components/CoffeeChatCardList";
import { NewCoffeeChatCardList } from "@/app/[locale]/(main)/coffeechat/components/NewCoffeeChatCardList";
import { Header } from "@/app/components/Header";
import { cn } from "@/utils/cn";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: me } = useGetMe();

  if (!me) return null;

  return (
    <>
      <Header />
      <div className="body-2 flex w-full border-b border-b-gray-300 text-gray-600">
        {["대기", "지나간 일정"].map((label, i) => (
          <button
            key={i}
            className={cn(
              "grow py-4",
              activeTab === i && "border-b-[3px] border-b-primary font-bold text-primary"
            )}
            onClick={() => setActiveTab(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-[0.88rem] px-5 py-[0.87rem]">
        <Suspense>
          {activeTab === 0 && <NewCoffeeChatCardList userRole={me.role} />}
          {activeTab === 1 && <CoffeeChatCardList userRole={me.role} />}
        </Suspense>
      </div>
    </>
  );
};

export default Page;
