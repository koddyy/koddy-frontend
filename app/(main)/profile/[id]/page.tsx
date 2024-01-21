"use client";

import { useRouter } from "next/navigation";
import { useGetUserById } from "@/apis/user/hooks/useGetUserById";
import { PendingBottomSheet } from "@/app/(main)/coffeechat/components/PendingBottomSheet";
import { ResultBottomSheet } from "@/app/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { UserCard } from "@/app/(main)/components/UserCard";
import { useRequestCoffeeChat } from "@/app/(main)/profile/hooks/useRequestCoffeeChat";
import { GoToLoginBottomSheet } from "@/app/components/GoToLoginBottomSheet";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button, LinkButton } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToggle } from "@/hooks/useToggle";

const Page = ({ params }: { params: { id: string } }) => {
  const userId = Number(params.id);
  const router = useRouter();
  const { data: user } = useGetUserById(userId);

  if (!user) return null;

  if (isNaN(userId)) return null;

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {user.role === "mentor" && <MentorProfile userId={userId} />}
      {user.role === "mentee" && <MenteeProfile userId={userId} />}
    </>
  );
};

interface ProfileProps {
  userId: number;
}

const MenteeProfile = ({ userId }: ProfileProps) => {
  const {
    isPending,
    isRequested,
    openPendingBottomSheet,
    closePendingBottomSheet,
    requestCoffeeChat,
  } = useRequestCoffeeChat();
  const { data: user, isLoading } = useGetUserById(userId);
  const { isAuthenticated, me } = useAuth();

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
            onClickYes={() => requestCoffeeChat({ mentor: String(me!.id), mentee: String(userId) })}
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

const MentorProfile = ({ userId }: ProfileProps) => {
  const { data: user, isLoading } = useGetUserById(userId);
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
          href={`/schedule?id=${userId}`}
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
