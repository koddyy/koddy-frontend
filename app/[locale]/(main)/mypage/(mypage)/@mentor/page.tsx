"use client";

import { useTranslations } from "next-intl";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import { Divider } from "@/components/Divider/Divider";
import { CUSTOMER_SERVICE_URL } from "@/constants/external-url";
import { PATH } from "@/constants/path";
import { Link } from "@/libs/navigation";
import { getDescription } from "@/utils/profile";

const linkStyle = "inline-block w-full px-[20px] py-[14px]";

const Page = () => {
  const t = useTranslations("mypage");
  const constants = useTranslations("constants");

  const { data: me } = useGetMe();

  if (!me) return null;

  return (
    <>
      <div className="flex flex-col items-center gap-3 px-11 pb-5 pt-[1.38rem]">
        <ProfileImageUpload imageUrl={me.profileImageUrl} role={me.role} />
        <div className="flex flex-col items-center gap-1">
          <span className="headline-2">{me.name}</span>
          <p className="text-gray-600">
            {getDescription(me, constants("profile-description.prefix"))}
          </p>
        </div>
      </div>
      <Divider className="border-4" />
      <Link href={PATH.MYPAGE_EDIT} className={linkStyle}>
        {t("edit-profile")}
      </Link>
      <Divider />
      <Link href={PATH.MYPAGE_EDIT + "/schedule"} className={linkStyle}>
        {t("edit-schedule")}
      </Link>
      <Divider className="border-4" />
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
    </>
  );
};

export default Page;
