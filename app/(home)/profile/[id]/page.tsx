"use client";

import { notFound, useRouter } from "next/navigation";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { UserCard } from "@/app/_components/UserCard";
import { PendingBottomSheet } from "@/app/(home)/coffeechat/_components/PendingBottomSheet";
import { ResultBottomSheet } from "@/app/(home)/coffeechat/_components/ResultBottomSheet/ResultBottomSheet";
import { useRequestCoffeeChat } from "@/app/(home)/profile/_hooks/useRequestCoffeeChat";
import { Button, LinkButton } from "@/components/Button";
import { MOCK_MENTEE, MOCK_MENTOR } from "@/mocks/dummy";

const Page = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const router = useRouter();

  if (id > 20) return notFound();

  const isMentor = id > 10;

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {isMentor ? <MentorProfile /> : <MenteeProfile />}
    </>
  );
};

const MenteeProfile = () => {
  const {
    isPending,
    isRequested,
    openPendingBottomSheet,
    closePendingBottomSheet,
    requestCoffeeChat,
  } = useRequestCoffeeChat();

  return (
    <>
      <UserCard cardType="vertical" {...MOCK_MENTEE} />
      <div className="px-5 py-3 pb-[5.75rem]">
        <span className="body-3-bold mb-[0.38rem]">자기소개</span>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          Duis quis incididunt deserunt exercitation cillum minim dolore mollit occaecat consequat
          tempor. Quis proident adipisicing exercitation ea duis. Non in nostrud commodo dolore
          fugiat occaecat consectetur proident esse id. Aliquip do mollit ut sit. Deserunt pariatur
          dolor eiusmod enim labore consequat eiusmod. Esse velit reprehenderit dolore tempor.
        </p>
      </div>
      <div className="sticky inset-x-5 bottom-[5.75rem] z-header border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <Button onClick={openPendingBottomSheet}>커피챗 제안하기</Button>
        {isPending && (
          <PendingBottomSheet
            resultType="positive"
            description={[`${MOCK_MENTEE.name}님에게`, "커피챗을 제안하시겠습니까?"]}
            onClickNo={closePendingBottomSheet}
            onClickYes={requestCoffeeChat}
          />
        )}
        {isRequested && (
          <ResultBottomSheet
            resultType="positive"
            description={[`${MOCK_MENTEE.name}님에게`, "커피챗을 제안하였습니다."]}
            confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
          />
        )}
      </div>
    </>
  );
};

const MentorProfile = () => {
  return (
    <>
      <UserCard cardType="vertical" {...MOCK_MENTOR} />
      <div className="px-5 py-3">
        <span className="body-3-bold mb-[0.38rem]">자기소개</span>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          Duis quis incididunt deserunt exercitation cillum minim dolore mollit occaecat consequat
          tempor. Quis proident adipisicing exercitation ea duis. Non in nostrud commodo dolore
          fugiat occaecat consectetur proident esse id. Aliquip do mollit ut sit. Deserunt pariatur
          dolor eiusmod enim labore consequat eiusmod. Esse velit reprehenderit dolore tempor.
        </p>
      </div>
      <div className="fixed bottom-[5.75rem] left-1/2 z-overlay flex w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <LinkButton className="inline-block" href={`/reservation?id=${78910}`}>
          커피챗 신청하기
        </LinkButton>
      </div>
    </>
  );
};

export default Page;
