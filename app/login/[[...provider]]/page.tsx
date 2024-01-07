"use client";

import { useState } from "react";
import { useGetOauthUrl } from "@/apis/auth/hooks/useGetOauthUrl";
import { LoginButton } from "@/components/LoginButton";
import { isValidProvider, type OauthProvider } from "@/types/oauth";
import { Login } from "./Login";

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
      <div className="flex flex-col items-center gap-24 px-5">
        <div className="h-60 w-60 bg-gray-100">온보딩</div>
        <div className="flex w-full flex-col gap-2">
          <LoginButton provider="kakao" onClick={() => setSelectedProvider("kakao")} />
          <LoginButton provider="google" onClick={() => setSelectedProvider("google")} />
        </div>
      </div>
      {isRedirected && (
        <Login provider={provider} authorizationCode={authorizationCode} state={state} />
      )}
    </>
  );
};

export default Page;
