import { ComponentPropsWithoutRef } from "react";
import Google from "@/assets/google.svg";
import Kakao from "@/assets/kakao.svg";
import { cn } from "@/utils/cn";

interface LoginButtonProps extends ComponentPropsWithoutRef<"button"> {
  provider: "kakao" | "google";
}

export const LoginButton = ({ provider, ...props }: LoginButtonProps) => {
  return (
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
        {provider === "kakao" && "카카오로 시작"}
        {provider === "google" && "구글로 시작"}
      </span>
    </button>
  );
};
