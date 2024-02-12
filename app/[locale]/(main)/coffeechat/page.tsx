"use client";

import { useTranslations } from "next-intl";
import qs from "querystring";
import { Suspense } from "react";
import {
  CoffeeChatCardListWithMentee,
  CoffeeChatCardListWithMentor,
} from "@/app/[locale]/(main)/coffeechat/components/CoffeeChatCardList";
import { GoToLogin } from "@/app/components/GoToLogin";
import { Header } from "@/app/components/Header";
import { Tag } from "@/components/Tag";
import { useAuth } from "@/hooks/useAuth";
import { Link, usePathname } from "@/libs/navigation";
import {
  CoffeeChatCategory,
  CoffeeChatStatus,
  isValidCoffeeCathStatus,
  isValidCoffeeChatCategory,
} from "@/types/coffeechat";
import { Role } from "@/types/user";
import { cn } from "@/utils/cn";

const CATEGORY: CoffeeChatCategory[] = ["applied", "suggested"];

const COFFEECHAT_STATUS_OPTIONS: Record<Role, Record<CoffeeChatCategory, CoffeeChatStatus[]>> = {
  mentor: {
    applied: ["APPLY", "APPROVE", "COMPLETE", "CANCEL,REJECT"],
    suggested: ["SUGGEST", "PENDING", "APPROVE", "COMPLETE", "CANCEL,REJECT"],
  },
  mentee: {
    applied: ["APPLY", "APPROVE", "COMPLETE", "CANCEL,REJECT"],
    suggested: ["SUGGEST", "PENDING", "APPROVE", "COMPLETE", "CANCEL,REJECT"],
  },
};

const Page = ({
  searchParams,
}: {
  searchParams: {
    explore?: string;
    category: string;
    status: string;
  };
}) => {
  const t = useTranslations("coffeechat");

  const explore = searchParams.explore ?? "mentee";
  const pathname = usePathname();
  const activeCategory = isValidCoffeeChatCategory(searchParams.category)
    ? searchParams.category
    : "applied";
  const activeStatus = isValidCoffeeCathStatus(searchParams.status)
    ? searchParams.status
    : undefined;

  const { isLoading, isAuthenticated, me } = useAuth();

  if (isLoading) return null;

  return (
    <>
      <Header />
      <div className="body-2 flex w-full border-b border-b-gray-300 text-gray-600">
        {CATEGORY.map((key, i) => (
          <Link
            key={i}
            href={`${pathname}?${qs.stringify({ category: key })}`}
            className={cn(
              "grow py-4 text-center",
              activeCategory === key && "border-b-[3px] border-b-primary font-bold text-primary"
            )}
          >
            {isAuthenticated
              ? t(`category.${me.role}.${key}`)
              : t(`category.${explore === "mentor" ? "mentee" : "mentor"}.${key}`)}
          </Link>
        ))}
      </div>
      {isAuthenticated ? (
        <>
          <div className="my-[13px] flex gap-[10px] px-[20px]">
            <Link
              href={`${pathname}?${qs.stringify({
                ...searchParams,
                status: undefined,
              })}`}
            >
              <Tag
                variant={!activeStatus ? "solid" : "outline"}
                color={!activeStatus ? "primary" : "grayscale"}
                className={cn(activeStatus && "body-3")}
              >
                {t("status.all")}
              </Tag>
            </Link>
            {COFFEECHAT_STATUS_OPTIONS[me.role][activeCategory].map((key, i) => {
              const isActive = activeStatus === key;
              return (
                <Link
                  key={i}
                  href={`${pathname}?${qs.stringify({
                    ...searchParams,
                    status: key,
                  })}`}
                >
                  <Tag
                    variant={isActive ? "solid" : "outline"}
                    color={isActive ? "primary" : "grayscale"}
                    className={cn(!isActive && "body-3")}
                  >
                    {t(`status.${me.role}.${key}`)}
                  </Tag>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-[14px] px-[20px] py-[14px]">
            <Suspense>
              {me.role === "mentor" && (
                <CoffeeChatCardListWithMentee category={activeCategory} status={activeStatus} />
              )}
              {me.role === "mentee" && (
                <CoffeeChatCardListWithMentor category={activeCategory} status={activeStatus} />
              )}
            </Suspense>
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
