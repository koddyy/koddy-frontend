"use client";

import { useTranslations } from "next-intl";
import { useGetMenteeById } from "@/apis/user/hooks/useGetMenteeById";
import { MenteeProfile } from "@/app/[locale]/(main)/components/UserProfile";
import { GoToLoginBottomSheet } from "@/app/components/GoToLoginBottomSheet";
import { Button } from "@/components/Button";
import { PATH } from "@/constants/path";
import { useAuth } from "@/hooks/useAuth";
import { useToggle } from "@/hooks/useToggle";
import { Link } from "@/libs/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const t = useTranslations("profile");

  const menteeId = Number(params.id);
  const { data: mentee, isLoading } = useGetMenteeById(menteeId);
  const { isAuthenticated } = useAuth();
  const [isOpenLoginBottomSheet, toggleLoginBottomSheet] = useToggle();

  if (isLoading) return null;

  if (!mentee) return <div>존재하지 않는 멘티예요</div>;

  return (
    <>
      <MenteeProfile {...mentee} />
      <div className="px-[20px] py-[12px]">
        <div className="text-box-label">{t("introduction")}</div>
        <p className="text-box">{mentee.introduction || "자기소개가 없습니다."}</p>
      </div>
      <div className="h-[96px]" />
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-[20px] py-[11px]">
        <Link
          href={`${PATH.PROFILE_MENTEE}/${menteeId}/suggest`}
          onClick={(e) => {
            if (isAuthenticated) return;
            e.preventDefault();
            toggleLoginBottomSheet();
          }}
        >
          <Button>{t("suggest-coffeechat")}</Button>
        </Link>
      </div>
      {isOpenLoginBottomSheet && <GoToLoginBottomSheet onClose={toggleLoginBottomSheet} />}
    </>
  );
};

export default Page;
