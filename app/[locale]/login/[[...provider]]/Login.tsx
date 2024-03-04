"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useOauthLogin } from "@/apis/auth/hooks/useOauthLogin";
import { Spinner } from "@/components/Spinner";
import { useProviderStore } from "@/stores/provider";
import { OauthProvider } from "@/types/oauth";

interface LoginProps {
  provider: OauthProvider;
  authorizationCode: string;
  state: string;
}

export const Login = ({ provider, authorizationCode, state }: LoginProps) => {
  const t = useTranslations("login");

  const { mutate: login, isPending } = useOauthLogin();
  const { setProvider, setLoggedIn } = useProviderStore();

  useEffect(() => {
    login(
      { provider, state, authorizationCode },
      {
        onSuccess: () => {
          setLoggedIn(true);
        },
        onSettled: () => {
          setProvider(provider);
        },
      }
    );
  }, [provider, authorizationCode, state, login, setLoggedIn, setProvider]);

  return (
    isPending && (
      <div className="absolute inset-0 z-overlay flex bg-gray-700 opacity-80">
        <div className="m-auto flex flex-col items-center gap-[21px] text-white">
          <Spinner size="lg" color="primary" />
          <div className="body-1-bold text-center">
            {t.rich("signing-in", {
              br: () => <br />,
            })}
          </div>
        </div>
      </div>
    )
  );
};
