"use client";

import Link from "next/link";
import { BrowseMenteeList } from "@/app/[locale]/(main)/components/BrowseMenteeList";
import { BrowseMentorList } from "@/app/[locale]/(main)/components/BrowseMentorList";
import { Header } from "@/app/components/Header";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useQueryString } from "@/hooks/useQueryString";
import {
  NewAppliedCoffeeChatList,
  NewSuggestedCoffeeChatList,
} from "./components/NewCoffeeChatList";
import { ProfileCompleteBanner } from "./components/ProfileCompleteBanner";
import { UserCardListSkeleton } from "./components/UserCardListSkeleton";

const Home = ({ searchParams }: { searchParams: { explore?: string } }) => {
  const explore = searchParams.explore ?? "mentee";
  const { createQueryString } = useQueryString();

  const { isAuthenticated, me } = useAuth();

  return (
    <>
      <Header
        rightContent={
          !isAuthenticated && (
            <Link href={createQueryString({ explore: explore === "mentor" ? "mentee" : "mentor" })}>
              <Button size="xs" className="body-2-bold h-[35px]" fullWidth={false}>
                {explore === "mentor" ? "멘티 둘러보기" : "멘토 둘러보기"}
              </Button>
            </Link>
          )
        }
      />
      <div className="px-5">
        {isAuthenticated && (
          <div className="mb-[26px] mt-[18px]">
            {!me.profileComplete && <ProfileCompleteBanner />}
          </div>
        )}
        <SSRSafeSuspense fallback={<UserCardListSkeleton />}>
          {isAuthenticated ? (
            <>
              {me.role === "mentor" && <NewAppliedCoffeeChatList />}
              {me.role === "mentee" && <NewSuggestedCoffeeChatList />}
              {me.role === "mentor" && <BrowseMenteeList />}
              {me.role === "mentee" && <BrowseMentorList />}
            </>
          ) : (
            <>
              {explore === "mentee" && <BrowseMenteeList />}
              {explore === "mentor" && <BrowseMentorList />}
            </>
          )}
        </SSRSafeSuspense>
      </div>
    </>
  );
};

export default Home;
