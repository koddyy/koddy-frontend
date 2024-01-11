"use client";

import { useState } from "react";
import { useGetOauthUrl } from "@/apis/auth/hooks/useGetOauthUrl";
import { Carousel } from "@/components/Carousel";
import { LoginButton } from "@/components/LoginButton";
import { isValidProvider, type OauthProvider } from "@/types/oauth";
import { Login } from "./Login";

const ONBOARDING = [
  { imageUrl: "/images/illustration_onboarding1.svg", description: "멘토/멘티 탐색하기" },
  { imageUrl: "/images/illustration_onboarding2.svg", description: "나에게 맞는 멘토/멘티 찾기" },
  { imageUrl: "/images/illustration_onboarding3.svg", description: "예약 내역 확인하기" },
];

const Page = ({
  params,
  searchParams,
}: {
  params: { provider: string[] };
  searchParams: { [key: string]: string | undefined };
}) => {
  const [selectedProvider, setSelectedProvider] = useState<OauthProvider>();
  const { data: oauthUrl, isSuccess } = useGetOauthUrl(selectedProvider);

  if (isSuccess) window.location.href = oauthUrl;

  const [provider] = params.provider ?? [];
  const authorizationCode = searchParams.code;
  const state = searchParams.state;

  const isRedirected = !!provider && isValidProvider(provider) && !!authorizationCode && !!state;

  return (
    <>
      <Carousel autoSwitch autoSwitchInterval={1100}>
        {ONBOARDING.map(({ imageUrl, description }, i) => (
          <div key={i} className="flex flex-col items-center gap-[24px] pb-[40px] pt-[34px]">
            <img src={imageUrl} />
            <div className="headline-1">{description}</div>
          </div>
        ))}
      </Carousel>
      <div className="mt-[80px] flex w-full flex-col gap-2 px-5">
        <LoginButton provider="kakao" onClick={() => setSelectedProvider("kakao")} />
        <LoginButton provider="google" onClick={() => setSelectedProvider("google")} />
      </div>
      {isRedirected && (
        <Login provider={provider} authorizationCode={authorizationCode} state={state} />
      )}
    </>
  );
};

export default Page;
