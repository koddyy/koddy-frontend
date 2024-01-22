import { useGetUserById } from "@/apis/user/hooks/useGetUserById";
import { GoToLoginBottomSheet } from "@/app/components/GoToLoginBottomSheet";
import { LinkButton } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToggle } from "@/hooks/useToggle";
import { UserCard } from "../../components/UserCard";

interface MentorProfileProps {
  mentorId: number;
}

export const MentorProfile = ({ mentorId }: MentorProfileProps) => {
  const { data: user, isLoading } = useGetUserById(mentorId);
  const { isAuthenticated } = useAuth();
  const [isGoToLoginBottomSheet, toggleGoToLoginBottomSheet] = useToggle();

  if (isLoading) return null;

  if (!user) return <div>존재하지 않는 멘토예요</div>;

  return (
    <>
      <UserCard cardType="vertical" {...user} />
      <div className="px-5 py-[20px]">
        <div className="body-3-bold mb-[0.38rem]">자기소개</div>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          {user.introduction || "자기소개가 없습니다."}
        </p>
      </div>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay flex w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <LinkButton
          href={`/schedule?id=${mentorId}`}
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
