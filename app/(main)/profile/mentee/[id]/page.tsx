"use client";

import { useGetMenteeById } from "@/apis/user/hooks/useGetMenteeById";
import { PendingBottomSheet } from "@/app/(main)/coffeechat/components/PendingBottomSheet";
import { ResultBottomSheet } from "@/app/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { UserCard } from "@/app/(main)/components/UserCard";
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
      <UserCard cardType="vertical" {...mentee} />
      <div className="px-5 py-3">
        <div className="body-3-bold mb-[0.38rem]">자기소개</div>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          {mentee.introduction || "자기소개가 없습니다."}
        </p>
      </div>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
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
