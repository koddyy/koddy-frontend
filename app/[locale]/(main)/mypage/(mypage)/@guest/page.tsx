"use client";

import { useTranslations } from "next-intl";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { CUSTOMER_SERVICE_URL, TERMS_OF_SERVICE_URL } from "@/constants/external-url";
import { PATH } from "@/constants/path";
import { Link } from "@/libs/navigation";

const linkStyle = "inline-block w-full px-[20px] py-[14px]";

const Page = ({
  searchParams,
}: {
  searchParams: {
    explore?: string;
  };
}) => {
  const t = useTranslations("mypage");

  const explore = searchParams.explore ?? "mentee";

  return (
    <>
      <div className="flex flex-col items-center gap-3 px-11 pb-5 pt-[1.38rem]">
        <ProfileImageUpload role={explore === "mentor" ? "mentee" : "mentor"} />
        <Link href={PATH.LOGIN}>
          <Button
            variant="outline"
            size="sm"
            className="body-1-bold h-[44px] w-[237px] text-gray-600"
          >
            {t("go-to-login-or-sign-in")}
          </Button>
        </Link>
      </div>
      <Divider className="border-4" />
      <a
        className={linkStyle}
        href={CUSTOMER_SERVICE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("customer-support")}
      </a>
      <Divider />
      <a
        className={linkStyle}
        href={TERMS_OF_SERVICE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("terms-of-service")}
      </a>
    </>
  );
};

export default Page;
