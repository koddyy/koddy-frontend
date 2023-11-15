"use client";

import { useRouter } from "next/navigation";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { PendingBottomSheet } from "@/app/(main)/coffeechat/components/PendingBottomSheet";
import { ResultBottomSheet } from "@/app/(main)/coffeechat/components/ResultBottomSheet/ResultBottomSheet";
import { useRequestCoffeeChat } from "@/app/(main)/profile/hooks/useRequestCoffeeChat";
import { NavigationBar } from "@/app/components/NavigationBar";
import { UserCard } from "@/app/(main)/components/UserCard";
import { Button, LinkButton } from "@/components/Button";
import { useGetMentee } from "@/hooks/temp/useGetMentee";
import { useGetMentor } from "@/hooks/temp/useGetMentor";

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
        <MenteeProfile id={params.id} userId={me.userId} />
      ) : (
        <MentorProfile id={params.id} />
      )}
    </>
  );
};

interface ProfileProps {
  id: string;
}

const MenteeProfile = ({ id, userId }: ProfileProps & { userId: string }) => {
  const {
    isPending,
    isRequested,
    openPendingBottomSheet,
    closePendingBottomSheet,
    requestCoffeeChat,
  } = useRequestCoffeeChat();
  const { user } = useGetMentee(id);

  if (!user) return <div>존재하지 않는 멘티예요</div>;

  return (
    <>
      <UserCard cardType="vertical" {...user} />
      <div className="px-5 py-3 pb-[5.75rem]">
        <div className="body-3-bold mb-[0.38rem]">자기소개</div>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          {user.introduce || "자기소개가 없습니다."}
        </p>
      </div>
      <div className="fixed bottom-[5.75rem] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <Button onClick={openPendingBottomSheet}>커피챗 제안하기</Button>
      </div>
      {isPending && (
        <PendingBottomSheet
          resultType="positive"
          description={[`${user.name}님에게`, "커피챗을 제안하시겠습니까?"]}
          onClickNo={closePendingBottomSheet}
          onClickYes={() => requestCoffeeChat({ mentor: userId, mentee: id })}
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

const MentorProfile = ({ id }: ProfileProps) => {
  const { user } = useGetMentor(id);

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
      <div className="fixed bottom-[5.75rem] left-1/2 z-overlay flex w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <LinkButton className="inline-block" href={`/schedule?id=${id}`}>
          커피챗 신청하기
        </LinkButton>
      </div>
    </>
  );
};

export default Page;
