"use client";

import { useRouter } from "next/navigation";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { PendingBottomSheet } from "@/app/[locale]/(main)/coffeechat/components/PendingBottomSheet";
import useCancelCoffeeChat from "@/app/[locale]/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button, LinkButton } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { CoffeeChatStatusText } from "@/constants/coffeechat";
import { MenteeProfile, MentorProfile } from "../../components/UserProfile";
import { CoffeeChatSchedule } from "../components/CoffeeChatSchedule";
import { CoffeeChatTypeSelectBottomSheet } from "../components/CoffeeChatTypeSelectBottomSheet";
import { RejectBottomSheet } from "../components/RejectBottomSheet";
import { ResultBottomSheet } from "../components/ResultBottomSheet/ResultBottomSheet";
import { useApproveCoffeeChatForMentor } from "../hooks/useApproveCoffeeChatForMentor";
import { useRejectCoffeeChatForMentee } from "../hooks/useRejectCoffeeChatForMentee";
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
  const { data, isLoading } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const { isApprove, isApproveSuccess, setIsApproveTrue, setIsApproveFalse, approveCoffeeChat } =
    useApproveCoffeeChatForMentor(coffeeChat?.status);

  const { isReject, isRejectSuccess, toggleIsReject, rejectCoffeeChat } =
    useRejectCoffeeChatForMentor(coffeeChat?.status);

  const { isCancelSuccess, cancelCoffeeChat } = useCancelCoffeeChat();

  if (isLoading) return null;

  if (!mentee || !coffeeChat) return <div>커피챗이 존재하지 않아요</div>;

  const isCancelable = coffeeChat.status === "APPROVE" || coffeeChat.status === "SUGGEST";

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={CoffeeChatStatusText.mentor[coffeeChat.status]}
      />
      {(coffeeChat.status === "APPROVE" ||
        coffeeChat.status === "APPLY" ||
        coffeeChat.status === "COMPLETE") && (
        <CoffeeChatSchedule
          status={coffeeChat.status}
          schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`}
        />
      )}
      <Divider />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">멘티의 자기소개</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">멘토에게 궁금한 점</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.question ?? "궁금한 점을 입력하지 않았어요."}
          </p>
        </div>
        {isCancelable && (
          <Button
            variant="outline"
            color="grayscale"
            className="border-[0.5px]"
            onClick={() => cancelCoffeeChat({ coffeeChatId: id })}
          >
            커피챗 취소하기
          </Button>
        )}
      </div>
      {coffeeChat.status === "APPLY" && (
        <>
          <div className="h-[96px]" />
          <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
            <div className="flex gap-5">
              <Button variant="outline" onClick={toggleIsReject}>
                거절하기
              </Button>
              <Button onClick={setIsApproveTrue}>수락하기</Button>
            </div>
          </div>
        </>
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
          description={[`${mentee.name}님과의`, "커피챗이 예약되었습니다."]}
          confirmButton={<LinkButton href="/">예약페이지로 가기</LinkButton>}
        />
      )}
      {isReject && (
        <RejectBottomSheet
          userName={mentee.name}
          onClickRejectButton={(rejectReason) =>
            rejectCoffeeChat({ coffeeChatId: id, rejectReason })
          }
          onClose={toggleIsReject}
        />
      )}
      {isRejectSuccess && (
        <ResultBottomSheet
          resultType="negative"
          description={[`${mentee.name}님과의`, "커피챗이 거절되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
      {isCancelSuccess && (
        <ResultBottomSheet
          resultType="negative"
          description={[`${mentee.name}님과의`, "커피챗이 취소되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
    </>
  );
};

const CoffeeChatDetailForMentee = ({ id }: CoffeeChatDetailProps) => {
  const { data, isLoading } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const { isReject, isRejectSuccess, setIsRejectTrue, setIsRejectFalse, rejectCoffeeChat } =
    useRejectCoffeeChatForMentee();

  const { isCancel, isCancelSuccess, setIsCancelTrue, setIsCancelFalse, cancelCoffeeChat } =
    useCancelCoffeeChat();

  if (isLoading) return null;

  if (!mentor || !coffeeChat) return <div>커피챗이 존재하지 않아요.</div>;

  const isCancelable = coffeeChat.status === "APPROVE" || coffeeChat.status === "APPLY";

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={CoffeeChatStatusText.mentee[coffeeChat.status]}
      />
      {(coffeeChat.status === "APPROVE" ||
        coffeeChat.status === "APPLY" ||
        coffeeChat.status === "COMPLETE") && (
        <CoffeeChatSchedule
          status={coffeeChat.status}
          schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`}
        />
      )}
      <Divider />
      <div className="px-[20px] py-[12px]">
        <div className="mb-[20px]">
          <span className="body-3-bold mb-[0.38rem] inline-block">멘토의 자기소개</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {isCancelable && (
          <Button
            variant="outline"
            color="grayscale"
            className="border-[0.5px]"
            onClick={setIsCancelTrue}
          >
            커피챗 취소하기
          </Button>
        )}
      </div>
      {coffeeChat.status === "SUGGEST" && (
        <>
          <div className="h-[96px]" />
          <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
            <div className="flex gap-5">
              <Button variant="outline" onClick={setIsRejectTrue}>
                거절하기
              </Button>
              <LinkButton href={`/schedule?mentor=${mentor.id}&coffeechat=${id}`}>
                수락하기
              </LinkButton>
            </div>
          </div>
        </>
      )}
      {isReject && (
        <RejectBottomSheet
          userName={mentor.name}
          onClickRejectButton={(rejectReason: string) =>
            rejectCoffeeChat({ coffeeChatId: id, rejectReason })
          }
          onClose={setIsRejectFalse}
        />
      )}
      {isRejectSuccess && (
        <ResultBottomSheet
          resultType="negative"
          description={[`${mentor.name}님과의`, "커피챗이 거절되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
      {isCancel && (
        <PendingBottomSheet
          resultType="negative"
          description={[`${mentor.name}님과의`, "커피챗을 취소하시겠습니까?"]}
          onClickNo={setIsCancelFalse}
          onClickYes={() => cancelCoffeeChat({ coffeeChatId: id })}
        />
      )}
      {isCancelSuccess && (
        <ResultBottomSheet
          resultType="negative"
          description={[`${mentor.name}님과의`, "커피챗이 취소되었습니다."]}
          confirmButton={<LinkButton href="/">홈으로 돌아가기</LinkButton>}
        />
      )}
    </>
  );
};

export default Page;
