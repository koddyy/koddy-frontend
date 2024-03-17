"use client";

import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { BrowseMentorList } from "../../components/BrowseMentorList";
import { NewSuggestedCoffeeChatList } from "../../components/NewCoffeeChatList";
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
        <NewSuggestedCoffeeChatList />
      </SSRSafeSuspense>
      <div className="px-[20px]">
        <BrowseMentorList />
      </div>
    </div>
  );
};

export default Page;
