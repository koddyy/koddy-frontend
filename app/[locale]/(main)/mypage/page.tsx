"use client";

import { useTranslations } from "next-intl";
import { NavigationBar } from "@/app/components/NavigationBar";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import ThreeDots from "@/assets/three_dots.svg";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
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
              로그인/회원가입 하기
            </Button>
          </Link>
        )}
      </div>
      <Divider className="border-4 border-gray-100" />
      {isAuthenticated ? (
        <>
          <div>
            <Link href={PATH.MYPAGE_EDIT} className={linkStyle}>
              {t("edit-profile")}
            </Link>
            <Divider className="border-gray-100" />
            {me?.role === "mentor" && (
              <Link href={PATH.MYPAGE_EDIT + "/schedule"} className={linkStyle}>
                {t("edit-schedule")}
              </Link>
            )}
          </div>
          <Divider className="border-4 border-gray-100" />
          <div>
            <Link href={PATH.MYPAGE_EDIT + "/language-and-timezone"} className={linkStyle}>
              {t("edit-language-and-timezone")}
            </Link>
            <Divider className="border-gray-100" />
            <div className="px-5 py-[0.88rem]">{t("customer-support")}</div>
            <Divider className="border-gray-100" />
          </div>
        </>
      ) : (
        <>
          <div className={linkStyle}>{t("customer-support")}</div>
          <Divider />
          <div className={linkStyle}>{t("terms-of-service")}</div>
        </>
      )}
    </>
  );
};

export default Page;
