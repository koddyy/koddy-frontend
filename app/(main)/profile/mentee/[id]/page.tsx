"use client";

import { useGetMenteeById } from "@/apis/user/hooks/useGetMenteeById";
import { PendingBottomSheet } from "@/app/(main)/coffeechat/components/PendingBottomSheet";
import { ResultBottomSheet } from "@/app/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { MenteeProfile } from "@/app/(main)/components/UserProfile";
import { GoToLoginBottomSheet } from "@/app/components/GoToLoginBottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useSuggestCoffeeChat } from "../../hooks/useSuggestCoffeeChat";

const Page = ({ params }: { params: { id: string } }) => {
  const menteeId = Number(params.id);
  const { data: mentee, isLoading } = useGetMenteeById(menteeId);
  const { isAuthenticated } = useAuth();

  const {
    isPending,
    isRequested,
    openPendingBottomSheet,
    closePendingBottomSheet,
    suggestCoffeeChat,
  } = useSuggestCoffeeChat();

  if (isLoading) return null;

  if (!mentee) return <div>존재하지 않는 멘티예요</div>;

  return (
    <>
      <MenteeProfile {...mentee} />
      <div className="px-[20px] py-[12px]">
        <div className="body-3-bold mb-[6px]">자기소개</div>
        <p className="body-1 rounded-[10px] border border-gray-300 px-[18px] py-[11px]">
          {mentee.introduction || "자기소개가 없습니다."}
        </p>
      </div>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-[20px] py-[11px]">
        <Button onClick={openPendingBottomSheet}>커피챗 제안하기</Button>
      </div>
      {isPending &&
        (isAuthenticated ? (
          <PendingBottomSheet
            resultType="positive"
            description={[`${mentee.name}님에게`, "커피챗을 제안하시겠습니까?"]}
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
          description={[`${mentee.name}님에게`, "커피챗을 제안하였습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
    </>
  );
};

export default Page;
