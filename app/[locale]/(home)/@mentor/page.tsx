"use client";

import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { NewAppliedCoffeeChatList } from "@/features/coffeechat/ui/NewAppliedCoffeeChatList";
import { BrowseMenteeList } from "@/features/mentee/ui/BrowseMenteeList";
import { ProfileCompleteBanner } from "@/features/user/ui/ProfileCompleteBanner";

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
