"use client";

import { useTranslations } from "next-intl";
import { BrowseMenteeList } from "@/app/[locale]/(main)/components/BrowseMenteeList";
import { BrowseMentorList } from "@/app/[locale]/(main)/components/BrowseMentorList";
import { Header } from "@/app/components/Header";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useQueryString } from "@/hooks/useQueryString";
import { Link } from "@/libs/navigation";
import {
  NewAppliedCoffeeChatList,
  NewSuggestedCoffeeChatList,
} from "./components/NewCoffeeChatList";
import { ProfileCompleteBanner } from "./components/ProfileCompleteBanner";

const Home = ({ searchParams }: { searchParams: { explore?: string } }) => {
  const t = useTranslations("home");

  const explore = searchParams.explore ?? "mentee";
  const { createQueryString } = useQueryString();

  const { isPending, isAuthenticated, me } = useAuth();

  return (
    <>
      <Header
        rightContent={
          !isPending ? (
            !isAuthenticated ? (
              <Link
                href={createQueryString({ explore: explore === "mentor" ? "mentee" : "mentor" })}
              >
                <Button size="xs" className="body-2-bold h-[35px]" fullWidth={false}>
                  {explore === "mentor" ? t("explore-mentee") : t("explore-mentor")}
                </Button>
              </Link>
            ) : null
          ) : (
            <></>
          )
        }
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
