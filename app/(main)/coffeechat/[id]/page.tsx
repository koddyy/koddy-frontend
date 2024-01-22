"use client";

import { useRouter } from "next/navigation";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { PendingBottomSheet } from "@/app/(main)/coffeechat/components/PendingBottomSheet";
import useCancelCoffeeChat from "@/app/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { NavigationBar } from "@/app/components/NavigationBar";
import Clip from "@/assets/link.svg";
import { Button, LinkButton } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import useClipboard from "@/hooks/useClipboard";
import { CoffeeChatTypeSelectBottomSheet } from "../components/CoffeeChatTypeSelectBottomSheet";
import { RejectBottomSheet } from "../components/RejectBottomSheet";
import { ResultBottomSheet } from "../components/ResultBottomSheet/ResultBottomSheet";
import { useApproveCoffeeChatForMentor } from "../hooks/useApproveCoffeeChatForMentor";
import { useRejectCoffeeChatForMentor } from "../hooks/useRejectCoffeeChatForMentor";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: me } = useGetMe();

  if (!me) return;

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {me.role === "mentor" && <CoffeeChatDetailForMentor id={Number(params.id)} />}
      {me.role === "mentee" && <CoffeeChatDetailForMentee id={Number(params.id)} />}
    </>
  );
};

interface CoffeeChatDetailProps {
  id: number;
}

const CoffeeChatDetailForMentor = ({ id }: CoffeeChatDetailProps) => {
  const { data: coffeechat, isLoading } = useGetCoffeeChatById(String(id));

  /** @TODO 커피챗 조회 api의 응답 데이터를 통해 초기 status를 지정해야함 */
  const { isApprove, isApproveSuccess, setIsApproveTrue, setIsApproveFalse, approveCoffeeChat } =
    useApproveCoffeeChatForMentor("APPLY");

  const { isReject, isRejectSuccess, toggleIsReject, rejectCoffeeChat } =
    useRejectCoffeeChatForMentor("APPLY");

  const {
    isCanceling,
    isCanceled,
    openCancelBottomSheet,
    closeCancelBottomSheet,
    cancelCoffeeChat,
  } = useCancelCoffeeChat(String(id));
  const { copyText } = useClipboard();

  if (isLoading) return null;

  if (!coffeechat) return <div>커피챗이 존재하지 않아요</div>;

  const isCancelable = coffeechat.status === "AGREE" || coffeechat.status === "SUGGEST";

  return (
    <>
      {/* <UserCard
        cardType="vertical"
        {...coffeechat.mentee}
        coffeeChatStatusText={CoffeeChatStatusText.mentor[coffeechat.status]}
      /> */}
      <div className="px-5">
        <Divider />
        {coffeechat.status === "AGREE" && (
          <div className="flex flex-col items-start gap-[0.38rem] py-4">
            <div className="body-3-bold text-gray-600">{`${coffeechat.date} ${coffeechat.startTime} ~ ${coffeechat.endTime}`}</div>
            <button
              className="label-bold flex items-center gap-2 rounded bg-gray-200 px-2 py-1"
              type="button"
              onClick={() => copyText(coffeechat.mentor.zoomLink ?? "")}
            >
              <span>
                <Clip />
              </span>
              <span>줌 링크 복사하기</span>
            </button>
          </div>
        )}
        <Divider />
        <div className="flex flex-col gap-5 py-3">
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
              color="grayscale"
              className="border-[0.5px]"
              onClick={openCancelBottomSheet}
            >
              커피챗 취소하기
            </Button>
          )}
        </div>
      </div>
      {coffeechat.status === "REQUEST" && (
        <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
          <div className="flex gap-5">
            <Button variant="outline" onClick={toggleIsReject}>
              거절하기
            </Button>
            <Button onClick={setIsApproveTrue}>수락하기</Button>
          </div>
        </div>
      )}
      {isApprove && (
        <CoffeeChatTypeSelectBottomSheet
          onClose={setIsApproveFalse}
          onSubmit={({ chatType, chatValue }) =>
            approveCoffeeChat({ coffeeChatId: id, chatType, chatValue })
          }
        />
      )}
      {isApproveSuccess && (
        <ResultBottomSheet
          resultType="positive"
          description={[`${coffeechat.mentee.name}님과의`, "커피챗이 예약되었습니다."]}
          confirmButton={<LinkButton href="/">예약페이지로 가기</LinkButton>}
        />
      )}
      {isReject && (
        <RejectBottomSheet
          userName={coffeechat.mentee.name}
          onClickRejectButton={(rejectReason) =>
            rejectCoffeeChat({ coffeeChatId: id, rejectReason })
          }
          onClose={toggleIsReject}
        />
      )}
      {isRejectSuccess && (
        <ResultBottomSheet
          resultType="negative"
          description={[`${coffeechat.mentee.name}님과의`, "커피챗이 거절되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
      {isCanceling && (
        <RejectBottomSheet
          type="cancel"
          userName={coffeechat.mentee.name}
          onClickRejectButton={(reason: string) => cancelCoffeeChat({ statusDesc: reason })}
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
  const { isReject, isRejectSuccess, setIsRejectTrue, setIsRejectFalse, rejectCoffeeChat } =
    useRejectCoffeeChatForMentor();

  const {
    isPending,
    isCanceled,
    openPendingBottomSheet,
    closePendingBottomSheet,
    cancelCoffeeChat,
  } = useCancelCoffeeChat(String(id));
  const { data: coffeechat, isLoading } = useGetCoffeeChatById(String(id));
  const { copyText } = useClipboard();

  if (isLoading) return null;

  if (!coffeechat) return <div>커피챗이 존재하지 않아요.</div>;

  const isCancelable = coffeechat.status === "AGREE" || coffeechat.status === "REQUEST";

  return (
    <>
      {/* <UserCard
        cardType="vertical"
        {...coffeechat.mentor}
        coffeeChatStatusText={CoffeeChatStatusText.mentee[coffeechat.status]}
      /> */}
      <div className="px-5">
        <Divider />
        {coffeechat.status === "AGREE" && (
          <div className="flex flex-col items-start gap-[0.38rem] py-4">
            <div className="body-3-bold text-gray-600">{`${coffeechat.date} ${coffeechat.startTime} ~ ${coffeechat.endTime}`}</div>
            <button
              className="label-bold flex items-center gap-2 rounded bg-gray-200 px-2 py-1"
              type="button"
              onClick={() => copyText(coffeechat.mentor.zoomLink ?? "")}
            >
              <span>
                <Clip />
              </span>
              <span>줌 링크 복사하기</span>
            </button>
          </div>
        )}
        <Divider />
        <div className="flex flex-col gap-5 py-3">
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">멘토의 자기소개</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeechat.mentor.introduce || "자기소개를 입력하지 않았어요."}
            </p>
          </div>
          {isCancelable && (
            <Button
              variant="outline"
              color="grayscale"
              className="border-[0.5px]"
              onClick={openPendingBottomSheet}
            >
              커피챗 취소하기
            </Button>
          )}
        </div>
      </div>
      {coffeechat.status === "SUGGEST" && (
        <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
          <div className="flex gap-5">
            <Button variant="outline" onClick={setIsRejectTrue}>
              거절하기
            </Button>
            <LinkButton href={`/schedule?mentor=${coffeechat.mentor.userId}&coffeechat=${id}`}>
              수락하기
            </LinkButton>
          </div>
        </div>
      )}
      {isReject && (
        <RejectBottomSheet
          userName={coffeechat.mentor.name}
          onClickRejectButton={(rejectReason: string) =>
            rejectCoffeeChat({ coffeeChatId: id, rejectReason })
          }
          onClose={setIsRejectFalse}
        />
      )}
      {isRejectSuccess && (
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
          onClickYes={() => cancelCoffeeChat()}
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
