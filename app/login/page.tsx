"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetOauthUrl } from "@/apis/auth/hooks/useGetOauthUrl";
import { useOauthLogin } from "@/apis/auth/hooks/useOauthLogin";
import { LoginButton } from "@/components/LoginButton";
import { isValidProvider, type OauthProvider } from "@/types/oauth";

const Page = () => {
  const searchParams = useSearchParams();
  const [selectedProvider, setSelectedProvider] = useState<OauthProvider>();
  const { data: oauthUrl, isSuccess } = useGetOauthUrl(selectedProvider);
  const { mutate: login } = useOauthLogin();

  if (isSuccess) window.location.href = oauthUrl;

  const provider = searchParams.get("provider");
  const authorizationCode = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    if (provider && isValidProvider(provider) && authorizationCode && state) {
      login({ provider, state, authorizationCode });
    }
  }, [provider, authorizationCode, state, login]);

  return (
    <div className="flex flex-col items-center gap-24 px-5">
      <div className="h-60 w-60 bg-gray-100">온보딩</div>
      <div className="flex w-full flex-col gap-2">
        <LoginButton provider="kakao" onClick={() => setSelectedProvider("kakao")} />
        <LoginButton provider="google" onClick={() => setSelectedProvider("google")} />
      </div>
    </div>
  );
};

export default Page;
