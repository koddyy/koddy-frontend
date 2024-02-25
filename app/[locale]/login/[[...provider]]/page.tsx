"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useGetOauthUrl } from "@/apis/auth/hooks/useGetOauthUrl";
import { Carousel } from "@/components/Carousel";
import { LoginButton } from "@/components/LoginButton";
import { TERMS_OF_SERVICE_URL } from "@/constants/external-url";
import { PATH } from "@/constants/path";
import { Link } from "@/libs/navigation";
import { isValidProvider, type OauthProvider } from "@/types/oauth";
import { Login } from "./Login";

const ONBOARDING = [
  { imageUrl: "/images/illustration_onboarding1.svg", description: "discover" },
  { imageUrl: "/images/illustration_onboarding2.svg", description: "match-with" },
  { imageUrl: "/images/illustration_onboarding3.svg", description: "manage-chat" },
] as const;

const Page = ({
  params,
  searchParams,
}: {
  params: { provider: string[] };
  searchParams: { [key: string]: string | undefined };
}) => {
  const t = useTranslations("login");

  const [selectedProvider, setSelectedProvider] = useState<OauthProvider>();
  const { data: oauthUrl, isSuccess } = useGetOauthUrl(selectedProvider);

  if (isSuccess) window.location.href = oauthUrl;

  const [provider] = params.provider ?? [];
  const authorizationCode = searchParams.code;
  const state = searchParams.state;

  const isRedirected = !!provider && isValidProvider(provider) && !!authorizationCode && !!state;

  return (
    <>
      <Carousel autoSwitch autoSwitchInterval={1100} hasIndicator>
        {ONBOARDING.map(({ imageUrl, description }, i) => (
          <div key={i} className="flex flex-col items-center gap-[24px] pb-[40px] pt-[34px]">
            <img src={imageUrl} />
            <div className="headline-1 text-center">
              {t.rich(`onboarding.${description}`, {
                br: () => <br />,
              })}
            </div>
          </div>
        ))}
      </Carousel>
      <div className="mt-[80px] flex w-full flex-col gap-2 px-5">
        <LoginButton provider="kakao" onClick={() => setSelectedProvider("kakao")} />
        <LoginButton provider="google" onClick={() => setSelectedProvider("google")} />
        <div className="label text-center text-gray-500">
          {t.rich("agree-terms-of-service", {
            a: (chunks) => (
              <a
                href={TERMS_OF_SERVICE_URL}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chunks}
              </a>
            ),
          })}
        </div>
        <Link className="body-1 mt-[32px] text-center text-gray-600" href={PATH.HOME}>
          {t("continue-as-guest")}
        </Link>
      </div>
      {isRedirected && (
        <Login provider={provider} authorizationCode={authorizationCode} state={state} />
      )}
    </>
  );
};

export default Page;
