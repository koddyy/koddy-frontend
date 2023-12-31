"use client";

import { useEffect } from "react";
import { useOauthLogin } from "@/apis/auth/hooks/useOauthLogin";
import { OauthProvider } from "@/types/oauth";

interface LoginProps {
  provider: OauthProvider;
  authorizationCode: string;
  state: string;
}

export const Login = ({ provider, authorizationCode, state }: LoginProps) => {
  const { mutate: login, isPending } = useOauthLogin();

  useEffect(() => {
    login({ provider, state, authorizationCode });
  }, [provider, authorizationCode, state, login]);

  return (
    isPending && (
      <div className="absolute inset-0 z-overlay flex bg-black opacity-80">
        <div className="m-auto text-white">계정에 접속하고 있어요</div>
      </div>
    )
  );
};
