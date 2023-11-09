"use client";

import { useRouter } from "next/navigation";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { UserCard } from "@/app/_components/UserCard";
import { Button, LinkButton } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { MOCK_MENTEE, MOCK_MENTOR } from "@/mocks/dummy";
import { RejectBottomSheet } from "../_components/RejectBottomSheet";
import { ResultBottomSheet } from "../_components/ResultBottomSheet/ResultBottomSheet";
import useAcceptCoffeeChat from "../_hooks/useAcceptCoffeeChat";
import useRejectCoffeeChat from "../_hooks/useRejectCoffeeChat";

const Page = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const router = useRouter();

  if (!(id === 123456 || id === 78910)) return <div>forbidden</div>; // TODO

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
      />
      {id === 123456 && <CoffeechatRequestFromMentee />}
      {id === 78910 && <CoffeechatRequestFromMentor />}
    </>
  );
};

const CoffeechatRequestFromMentee = () => {
  const { isAccepted, acceptCoffeeChat } = useAcceptCoffeeChat();
  const {
    isRejecting,
    isRejected,
    openRejectBottomSheet,
    closeRejectBottomSheet,
    rejectCoffeeChat,
  } = useRejectCoffeeChat();

  return (
    <>
      <UserCard cardType="vertical" {...MOCK_MENTEE} />
      <div className="px-5">
        <Divider />
        <div className="body-3-bold py-4 text-gray-600">예약 신청 날짜: 2023/11/01 15:00</div>
        <Divider />
        <div className="flex flex-col gap-5 pb-[5.75rem] pt-3">
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">자기소개</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              Duis quis incididunt deserunt exercitation cillum minim dolore mollit occaecat
              consequat tempor. Quis proident adipisicing exercitation ea duis. Non in nostrud
              commodo dolore fugiat occaecat consectetur proident esse id. Aliquip do mollit ut sit.
              Deserunt pariatur dolor eiusmod enim labore consequat eiusmod. Esse velit
              reprehenderit dolore tempor.
            </p>
          </div>
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">궁금한 점</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              Duis quis incididunt deserunt exercitation cillum minim dolore mollit occaecat
              consequat tempor. Quis proident adipisicing exercitation ea duis. Non in nostrud
              commodo dolore fugiat occaecat consectetur proident esse id. Aliquip do mollit ut sit.
              Deserunt pariatur dolor eiusmod enim labore consequat eiusmod. Esse velit
              reprehenderit dolore tempor.
            </p>
          </div>
        </div>
      </div>
      <div className="sticky inset-x-5 bottom-[5.75rem] z-header border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <div className="flex gap-5">
          <Button variant="outline" onClick={openRejectBottomSheet}>
            거절하기
          </Button>
          <Button onClick={acceptCoffeeChat}>수락하기</Button>
        </div>
        {isAccepted && (
          <ResultBottomSheet
            resultType="positive"
            description={[`${MOCK_MENTEE.name}님과의`, "커피챗이 예약되었습니다."]}
            confirmButton={<LinkButton href="/">예약페이지로 가기</LinkButton>}
          />
        )}
        {isRejecting && (
          <RejectBottomSheet
            userName={MOCK_MENTEE.name}
            onClickRejectButton={rejectCoffeeChat}
            onClose={closeRejectBottomSheet}
          />
        )}
        {isRejected && (
          <ResultBottomSheet
            resultType="positive"
            description={[`${MOCK_MENTEE.name}님과의`, "커피챗이 거절되었습니다."]}
            confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
          />
        )}
      </div>
    </>
  );
};

const CoffeechatRequestFromMentor = () => {
  return (
    <>
      <UserCard cardType="vertical" {...MOCK_MENTOR} />
      <div className="px-5">
        <Divider />
        <div className="flex flex-col gap-5 pb-[5.75rem] pt-3">
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">자기소개</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              Duis quis incididunt deserunt exercitation cillum minim dolore mollit occaecat
              consequat tempor. Quis proident adipisicing exercitation ea duis. Non in nostrud
              commodo dolore fugiat occaecat consectetur proident esse id. Aliquip do mollit ut sit.
              Deserunt pariatur dolor eiusmod enim labore consequat eiusmod. Esse velit
              reprehenderit dolore tempor.
            </p>
          </div>
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">궁금한 점</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              Duis quis incididunt deserunt exercitation cillum minim dolore mollit occaecat
              consequat tempor. Quis proident adipisicing exercitation ea duis. Non in nostrud
              commodo dolore fugiat occaecat consectetur proident esse id. Aliquip do mollit ut sit.
              Deserunt pariatur dolor eiusmod enim labore consequat eiusmod. Esse velit
              reprehenderit dolore tempor.
            </p>
          </div>
        </div>
      </div>
      <div className="sticky inset-x-5 bottom-[5.75rem] z-header border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <div className="flex gap-5">
          <Button variant="outline">거절하기</Button>
          <Button>수락하기</Button>
        </div>
      </div>
    </>
  );
};

export default Page;
