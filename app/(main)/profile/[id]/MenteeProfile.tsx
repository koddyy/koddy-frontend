import { useGetUserById } from "@/apis/user/hooks/useGetUserById";
import { GoToLoginBottomSheet } from "@/app/components/GoToLoginBottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { PendingBottomSheet } from "../../coffeechat/components/PendingBottomSheet";
import { ResultBottomSheet } from "../../coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { UserCard } from "../../components/UserCard";
import { useSuggestCoffeeChat } from "../hooks/useSuggestCoffeeChat";

interface MenteeProfileProps {
  menteeId: number;
}

export const MenteeProfile = ({ menteeId }: MenteeProfileProps) => {
  const {
    isPending,
    isRequested,
    openPendingBottomSheet,
    closePendingBottomSheet,
    suggestCoffeeChat,
  } = useSuggestCoffeeChat();
  const { data: user, isLoading } = useGetUserById(menteeId);
  const { isAuthenticated } = useAuth();

  if (isLoading) return null;

  if (!user) return <div>존재하지 않는 멘티예요</div>;

  return (
    <>
      <UserCard cardType="vertical" {...user} />
      <div className="px-5 py-3">
        <div className="body-3-bold mb-[0.38rem]">자기소개</div>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          {user.introduction || "자기소개가 없습니다."}
        </p>
      </div>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <Button onClick={openPendingBottomSheet}>커피챗 제안하기</Button>
      </div>
      {isPending &&
        (isAuthenticated ? (
          <PendingBottomSheet
            resultType="positive"
            description={[`${user.name}님에게`, "커피챗을 제안하시겠습니까?"]}
            onClickNo={closePendingBottomSheet}
            /** @TODO applyReason 입력 단계 추가 */
            onClickYes={() => suggestCoffeeChat({ menteeId, applyReason: "temp" })}
          />
        ) : (
          <GoToLoginBottomSheet onClose={closePendingBottomSheet} />
        ))}

      {isRequested && (
        <ResultBottomSheet
          resultType="positive"
          description={[`${user.name}님에게`, "커피챗을 제안하였습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
    </>
  );
};
