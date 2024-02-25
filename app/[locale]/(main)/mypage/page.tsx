"use client";

import { useTranslations } from "next-intl";
import { NavigationBar } from "@/app/components/NavigationBar";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import ThreeDots from "@/assets/three_dots.svg";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { CUSTOMER_SERVICE_URL, TERMS_OF_SERVICE_URL } from "@/constants/external-url";
import { PATH } from "@/constants/path";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@/libs/navigation";
import { getDescription } from "@/utils/profile";

const linkStyle = "inline-block w-full px-[20px] py-[14px]";

const Page = ({
  searchParams,
}: {
  searchParams: {
    explore?: string;
  };
}) => {
  const t = useTranslations("mypage");
  const constants = useTranslations("constants");

  const explore = searchParams.explore ?? "mentee";
  const { isLoading, isAuthenticated, me } = useAuth();

  if (isLoading) return null;

  return (
    <>
      <NavigationBar
        title={t("title")}
        rightContent={
          isAuthenticated && (
            <Link href={PATH.MYPAGE_ACCOUNT}>
              <ThreeDots />
            </Link>
          )
        }
      />
      <div className="flex flex-col items-center gap-3 px-11 pb-5 pt-[1.38rem]">
        <ProfileImageUpload
          imageUrl={isAuthenticated ? me.profileImageUrl : ""}
          role={isAuthenticated ? me.role : explore === "mentor" ? "mentee" : "mentor"}
        />
        {isAuthenticated ? (
          <div className="flex flex-col items-center gap-1">
            <span className="headline-2">{me.name}</span>
            <p className="text-gray-600">
              {getDescription(me, constants("profile-description.prefix"))}
            </p>
          </div>
        ) : (
          <Link href={PATH.LOGIN}>
            <Button
              variant="outline"
              size="sm"
              className="body-1-bold h-[44px] w-[237px] text-gray-600"
            >
              {t("go-to-login-or-sign-in")}
            </Button>
          </Link>
        )}
      </div>
      <Divider className="border-4" />
      {isAuthenticated ? (
        <>
          <div>
            <Link href={PATH.MYPAGE_EDIT} className={linkStyle}>
              {t("edit-profile")}
            </Link>
            <Divider />
            {me?.role === "mentor" && (
              <Link href={PATH.MYPAGE_EDIT + "/schedule"} className={linkStyle}>
                {t("edit-schedule")}
              </Link>
            )}
          </div>
          <Divider className="border-4" />
          <div>
            <Link href={PATH.MYPAGE_EDIT + "/language-and-timezone"} className={linkStyle}>
              {t("edit-language-and-timezone")}
            </Link>
            <Divider />
            <a
              className={linkStyle}
              href={CUSTOMER_SERVICE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("customer-support")}
            </a>
            <Divider />
          </div>
        </>
      ) : (
        <>
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
      )}
    </>
  );
};

export default Page;
