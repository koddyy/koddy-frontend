import { useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, useEffect } from "react";
import Google from "@/assets/google.svg";
import Kakao from "@/assets/kakao.svg";
import { Tooltip } from "@/components/Tooltip";
import { useProviderStore } from "@/stores/provider";
import { cn } from "@/utils/cn";

interface LoginButtonProps extends ComponentPropsWithoutRef<"button"> {
  provider: "kakao" | "google";
}

export const LoginButton = ({ provider, ...props }: LoginButtonProps) => {
  const t = useTranslations("login");

  const { provider: selectedProvider, loggedIn } = useProviderStore();

  useEffect(() => {
    useProviderStore.persist.rehydrate();
  }, []);

  const isRecentLoggedIn = loggedIn && selectedProvider === provider;

  return (
    <Tooltip content={t("recent-login")} open={isRecentLoggedIn}>
      <button
        className={cn(
          "body-1-bold flex w-full items-center justify-between rounded-xl px-[18px] py-[13px]",
          provider === "kakao" && "bg-[#FEE500]",
          provider === "google" && "outline outline-gray-400"
        )}
        {...props}
      >
        {provider === "kakao" && <Kakao />}
        {provider === "google" && <Google />}
        <span className="grow text-center">
          {provider === "kakao" && t("sign-in.kakao")}
          {provider === "google" && t("sign-in.google")}
        </span>
      </button>
    </Tooltip>
  );
};
