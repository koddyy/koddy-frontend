"use client";

import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { BrowseMenteeList } from "../../components/BrowseMenteeList";
import { NewAppliedCoffeeChatList } from "../../components/NewCoffeeChatList";
import { ProfileCompleteBanner } from "../../components/ProfileCompleteBanner";

const Page = () => {
  const { data: me } = useGetMe();

  return (
    <div className="mt-[18px]">
      {!me?.profileComplete && (
        <div className="mb-[26px] px-[20px]">
          <ProfileCompleteBanner />
        </div>
      )}
      <SSRSafeSuspense>
        <NewAppliedCoffeeChatList />
      </SSRSafeSuspense>
      <div className="px-[20px]">
        <BrowseMenteeList />
      </div>
    </div>
  );
};

export default Page;
