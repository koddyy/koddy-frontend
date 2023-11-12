"use client";

import { useRouter } from "next/navigation";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { UserCard } from "@/app/_components/UserCard";
import { PendingBottomSheet } from "@/app/(home)/coffeechat/_components/PendingBottomSheet";
import useCancelCoffeeChat from "@/app/(home)/coffeechat/_hooks/useCancelCoffeeChat";
import Clip from "@/assets/link.svg";
import { Button, LinkButton } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { CoffeeChatStatusText } from "@/constants/coffeechat";
import { useGetCoffeeChatById } from "@/hooks/temp/useGetCoffeeChatById";
import { RejectBottomSheet } from "../_components/RejectBottomSheet";
import { ResultBottomSheet } from "../_components/ResultBottomSheet/ResultBottomSheet";
import useAcceptCoffeeChat from "../_hooks/useAcceptCoffeeChat";
import useRejectCoffeeChat from "../_hooks/useRejectCoffeeChat";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: me } = useGetMe();

  if (!me) return;

  const isMentor = me.mentorYn === "Y";
  const isMentee = me.mentorYn === "N";

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {isMentor && <CoffeeChatDetailForMentor id={params.id} />}
      {isMentee && <CoffeeChatDetailForMentee id={params.id} />}
    </>
  );
};

interface CoffeeChatDetailProps {
  id: string;
}

const CoffeeChatDetailForMentor = ({ id }: CoffeeChatDetailProps) => {
  const { isAccepted, acceptCoffeeChat } = useAcceptCoffeeChat();
  const {
    isRejecting,
    isRejected,
    openRejectBottomSheet,
    closeRejectBottomSheet,
    rejectCoffeeChat,
  } = useRejectCoffeeChat();
  const {
    isCanceling,
    isCanceled,
    openCancelBottomSheet,
    closeCancelBottomSheet,
    cancelCoffeeChat,
  } = useCancelCoffeeChat();
  const { coffeechat } = useGetCoffeeChatById(id);

  if (!coffeechat) return <div>커피챗이 존재하지 않아요</div>;

  const isCancelable = coffeechat.status === "AGREE" || coffeechat.status === "SUGGEST";

  return (
    <>
      <UserCard
        cardType="vertical"
        {...coffeechat.mentee}
        coffeeChatStatusText={CoffeeChatStatusText.mentor[coffeechat.status]}
      />
      <div className="px-5">
        <Divider />
        <div className="flex flex-col items-start gap-[0.38rem] py-4">
          <div className="body-3-bold text-gray-600">{`${coffeechat.date} ${coffeechat.startTime} ~ ${coffeechat.endTime}`}</div>
          {coffeechat.status === "AGREE" && (
            <button
              className="label-bold flex items-center gap-2 rounded bg-gray-200 px-2 py-1"
              type="button"
            >
              <span>
                <Clip />
              </span>
              <span>줌 링크 복사하기</span>
            </button>
          )}
        </div>
        <Divider />
        <div className="flex flex-col gap-5 pb-[5.75rem] pt-3">
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">멘티의 자기소개</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeechat.mentee.introduce ?? "자기소개를 입력하지 않았어요."}
            </p>
          </div>
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">멘토에게 궁금한 점</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeechat.question ?? "궁금한 점을 입력하지 않았어요."}
            </p>
          </div>
          {isCancelable && (
            <Button
              variant="outline"
              className="border-[0.5px] border-gray-500 text-gray-500"
              onClick={openCancelBottomSheet}
            >
              커피챗 취소하기
            </Button>
          )}
        </div>
      </div>
      {coffeechat.status === "REQUEST" && (
        <div className="sticky inset-x-5 bottom-[5.75rem] z-header border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
          <div className="flex gap-5">
            <Button variant="outline" onClick={openRejectBottomSheet}>
              거절하기
            </Button>
            <Button onClick={acceptCoffeeChat}>수락하기</Button>
          </div>
        </div>
      )}
      {isAccepted && (
        <ResultBottomSheet
          resultType="positive"
          description={[`${coffeechat.mentee.name}님과의`, "커피챗이 예약되었습니다."]}
          confirmButton={<LinkButton href="/">예약페이지로 가기</LinkButton>}
        />
      )}
      {isRejecting && (
        <RejectBottomSheet
          userName={coffeechat.mentee.name}
          onClickRejectButton={rejectCoffeeChat}
          onClose={closeRejectBottomSheet}
        />
      )}
      {isRejected && (
        <ResultBottomSheet
          resultType="positive"
          description={[`${coffeechat.mentee.name}님과의`, "커피챗이 거절되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
      {isCanceling && (
        <RejectBottomSheet
          type="cancel"
          userName={coffeechat.mentee.name}
          onClickRejectButton={(reason: string) => cancelCoffeeChat(reason)}
          onClose={closeCancelBottomSheet}
        />
      )}
      {isCanceled && (
        <ResultBottomSheet
          resultType="negative"
          description={[`${coffeechat.mentee.name}님과의`, "커피챗이 취소되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
    </>
  );
};

const CoffeeChatDetailForMentee = ({ id }: CoffeeChatDetailProps) => {
  const {
    isRejecting,
    isRejected,
    openRejectBottomSheet,
    closeRejectBottomSheet,
    rejectCoffeeChat,
  } = useRejectCoffeeChat();
  const {
    isPending,
    isCanceled,
    openPendingBottomSheet,
    closePendingBottomSheet,
    cancelCoffeeChat,
  } = useCancelCoffeeChat();
  const { coffeechat } = useGetCoffeeChatById(id);

  if (!coffeechat) return <div>커피챗이 존재하지 않아요.</div>;

  const isCancelable = coffeechat.status === "AGREE" || coffeechat.status === "REQUEST";

  return (
    <>
      <UserCard
        cardType="vertical"
        {...coffeechat.mentor}
        coffeeChatStatusText={CoffeeChatStatusText.mentee[coffeechat.status]}
      />
      <div className="px-5">
        <Divider />
        <div className="flex flex-col gap-5 pb-[5.75rem] pt-3">
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">멘토의 자기소개</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeechat.mentor.introduce}
            </p>
          </div>
          {isCancelable && (
            <Button
              variant="outline"
              className="border-[0.5px] border-gray-500 text-gray-500"
              onClick={openPendingBottomSheet}
            >
              커피챗 취소하기
            </Button>
          )}
        </div>
      </div>
      {coffeechat.status === "REQUEST" && (
        <div className="sticky inset-x-5 bottom-[5.75rem] z-header border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
          <div className="flex gap-5">
            <Button variant="outline" onClick={openRejectBottomSheet}>
              거절하기
            </Button>
            <LinkButton href={`/reservation?id=${id}`}>수락하기</LinkButton>
          </div>
        </div>
      )}
      {isRejecting && (
        <RejectBottomSheet
          userName={coffeechat.mentor.name}
          onClickRejectButton={rejectCoffeeChat}
          onClose={closeRejectBottomSheet}
        />
      )}
      {isRejected && (
        <ResultBottomSheet
          resultType="negative"
          description={[`${coffeechat.mentor.name}님과의`, "커피챗이 거절되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
      {isPending && (
        <PendingBottomSheet
          resultType="negative"
          description={[`${coffeechat.mentor.name}님과의`, "커피챗을 취소하시겠습니까?"]}
          onClickNo={closePendingBottomSheet}
          onClickYes={cancelCoffeeChat}
        />
      )}
      {isCanceled && (
        <ResultBottomSheet
          resultType="negative"
          description={[`${coffeechat.mentor.name}님과의`, "커피챗이 취소되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
    </>
  );
};

export default Page;
