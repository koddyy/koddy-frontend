"use client";

import { BrowseMenteeList } from "@/app/[locale]/(main)/components/BrowseMenteeList";
import { BrowseMentorList } from "@/app/[locale]/(main)/components/BrowseMentorList";
import { Header } from "@/app/components/Header";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { useAuth } from "@/hooks/useAuth";
import {
  NewAppliedCoffeeChatList,
  NewSuggestedCoffeeChatList,
} from "./components/NewCoffeeChatList";
import { ProfileCompleteBanner } from "./components/ProfileCompleteBanner";
import { SwitchExploreUserButton } from "./components/SwitchExploreUserButton";

const Home = ({ searchParams }: { searchParams: { explore?: string } }) => {
  const explore = searchParams.explore ?? "mentee";

  const { isPending, isAuthenticated, me } = useAuth();

  return (
    <>
      <Header
        rightContent={!isPending ? !isAuthenticated ? <SwitchExploreUserButton /> : null : <></>}
      />
      {!isPending && (
        <div className="mt-[18px]">
          {isAuthenticated ? (
            <>
              {!me.profileComplete && (
                <div className="mb-[26px] px-[20px]">
                  <ProfileCompleteBanner />
                </div>
              )}
              <SSRSafeSuspense>
                {me.role === "mentee" && <NewSuggestedCoffeeChatList />}
                {me.role === "mentor" && <NewAppliedCoffeeChatList />}
              </SSRSafeSuspense>
              <div className="px-[20px]">
                {me.role === "mentor" && <BrowseMenteeList />}
                {me.role === "mentee" && <BrowseMentorList />}
              </div>
            </>
          ) : (
            <div className="px-[20px]">
              {explore === "mentee" && <BrowseMenteeList />}
              {explore === "mentor" && <BrowseMentorList />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
