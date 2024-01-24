"use client";

import { useGetMentorById } from "@/apis/user/hooks/useGetMentorById";
import { MentorProfile } from "@/app/[locale]/(main)/components/UserProfile";
import { GoToLoginBottomSheet } from "@/app/components/GoToLoginBottomSheet";
import { LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";
import { useAuth } from "@/hooks/useAuth";
import { useToggle } from "@/hooks/useToggle";

const Page = ({ params }: { params: { id: string } }) => {
  const mentorId = Number(params.id);
  const { data: mentor, isLoading } = useGetMentorById(mentorId);
  const { isAuthenticated } = useAuth();
  const [isGoToLoginBottomSheet, toggleGoToLoginBottomSheet] = useToggle();

  if (isLoading) return null;

  if (!mentor) return <div>존재하지 않는 멘토예요</div>;

  return (
    <>
      <MentorProfile {...mentor} />
      <div className="px-[20px] py-[12px]">
        <div className="body-3-bold mb-[0.38rem]">자기소개</div>
        <p className="body-1 rounded-[10px] border border-gray-300 px-[18px] py-[11px]">
          {mentor.introduction || "자기소개가 없습니다."}
        </p>
      </div>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay flex w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-[20px] py-[11px]">
        <LinkButton
          href={PATH.SCHEDULE + `?mentor=${mentorId}`}
          onClick={(e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              toggleGoToLoginBottomSheet();
            }
          }}
        >
          커피챗 신청하기
        </LinkButton>
      </div>
      {isGoToLoginBottomSheet && <GoToLoginBottomSheet onClose={toggleGoToLoginBottomSheet} />}
    </>
  );
};

export default Page;
