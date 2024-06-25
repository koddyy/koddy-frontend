"use client";

import { useTranslations } from "next-intl";
import { useOauthLogout } from "@/apis/auth/hooks/useOauthLogout";
import { useSignout } from "@/apis/user/hooks/useSignout";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Divider } from "@/components/Divider/Divider";
import { TERMS_OF_SERVICE_URL } from "@/constants/external-url";

const Page = () => {
  const t = useTranslations("mypage.account");

  const { mutate: logout } = useOauthLogout();
  const { mutate: signout } = useSignout();

  return (
    <>
      <NavigationBar title="설정" />
      <div className="flex flex-col">
        <a
          className="body-3 w-full px-[20px] py-[14px] text-start"
          href={TERMS_OF_SERVICE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("terms-of-service")}
        </a>
        <Divider />
        <button
          className="body-3 w-full px-[20px] py-[14px] text-start"
          onClick={() => {
            if (window.confirm("로그아웃 하시겠습니까?")) logout();
          }}
        >
          {t("sign-out")}
        </button>
        <Divider />
        <button
          className="body-3 w-full px-[20px] py-[14px] text-start"
          onClick={() => {
            if (window.confirm("탈퇴 하시겠습니까?")) signout();
          }}
        >
          {t("delete-account")}
        </button>
      </div>
    </>
  );
};

export default Page;
