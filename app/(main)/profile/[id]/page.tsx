"use client";

import { useRouter } from "next/navigation";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { useGetUserById } from "@/apis/user/hooks/useGetMentorById";
import { PendingBottomSheet } from "@/app/(main)/coffeechat/components/PendingBottomSheet";
import { ResultBottomSheet } from "@/app/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { UserCard } from "@/app/(main)/components/UserCard";
import { useRequestCoffeeChat } from "@/app/(main)/profile/hooks/useRequestCoffeeChat";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button, LinkButton } from "@/components/Button";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: me } = useGetMe();

  if (!me) return null;

  const isMentor = me.mentorYn === "Y";

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {isMentor ? (
        <MenteeProfile menteeId={params.id} mentorId={me.userId} />
      ) : (
        <MentorProfile mentorId={params.id} />
      )}
    </>
  );
};

interface ProfileProps {
  mentorId: string;
  menteeId: string;
}

const MenteeProfile = ({ menteeId, mentorId }: ProfileProps) => {
  const {
    isPending,
    isRequested,
    openPendingBottomSheet,
    closePendingBottomSheet,
    requestCoffeeChat,
  } = useRequestCoffeeChat();
  const { data: user } = useGetUserById(menteeId);

  if (!user) return <div>존재하지 않는 멘티예요</div>;

  return (
    <>
      <UserCard cardType="vertical" {...user} />
      <div className="px-5 py-3">
        <div className="body-3-bold mb-[0.38rem]">자기소개</div>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          {user.introduce || "자기소개가 없습니다."}
        </p>
      </div>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <Button onClick={openPendingBottomSheet}>커피챗 제안하기</Button>
      </div>
      {isPending && (
        <PendingBottomSheet
          resultType="positive"
          description={[`${user.name}님에게`, "커피챗을 제안하시겠습니까?"]}
          onClickNo={closePendingBottomSheet}
          onClickYes={() => requestCoffeeChat({ mentor: mentorId, mentee: menteeId })}
        />
      )}
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

const MentorProfile = ({ mentorId }: Omit<ProfileProps, "menteeId">) => {
  const { data: user } = useGetUserById(mentorId);

  if (!user) return <div>존재하지 않는 멘토예요</div>;

  return (
    <>
      <UserCard cardType="vertical" {...user} />
      <div className="px-5 py-3">
        <div className="body-3-bold mb-[0.38rem]">자기소개</div>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          {user.introduce || "자기소개가 없습니다."}
        </p>
      </div>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay flex w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <LinkButton className="inline-block" href={`/schedule?id=${mentorId}`}>
          커피챗 신청하기
        </LinkButton>
      </div>
    </>
  );
};

export default Page;
