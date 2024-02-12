"use client";

import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { PendingBottomSheet } from "@/app/[locale]/(main)/coffeechat/components/PendingBottomSheet";
import useCancelCoffeeChat from "@/app/[locale]/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button, LinkButton } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { useRouter } from "@/libs/navigation";
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
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

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
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
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
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("introductionOfMentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionToMentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionOfMentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason ?? coffeeChat.question}
            </p>
          </div>
        )}
        {isCancelable && (
          <Button
            variant="outline"
            color="grayscale"
            className="border-[0.5px]"
            onClick={() => cancelCoffeeChat({ coffeeChatId: id })}
          >
            {t("cancel-coffeechat")}
          </Button>
        )}
      </div>
      {coffeeChat.status === "APPLY" && (
        <>
          <div className="h-[96px]" />
          <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
            <div className="flex gap-5">
              <Button variant="outline" onClick={toggleIsReject}>
                {t("reject-coffeechat")}
              </Button>
              <Button onClick={setIsApproveTrue}>{t("accept-coffeechat")}</Button>
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
          startTime={coffeeChat.start}
          endTime={coffeeChat.end}
        />
      )}
      {isApproveSuccess && (
        <ResultBottomSheet
          resultType="positive"
          description={t("ResultBottomSheet.APPROVE", { name: mentee.name })}
          confirmButton={<LinkButton href="/">{t("ResultBottomSheet.go-to-calendar")}</LinkButton>}
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
          description={t("ResultBottomSheet.REJECT", { name: mentee.name })}
          confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
        />
      )}
      {isCancelSuccess && (
        <ResultBottomSheet
          resultType="negative"
          description={t("ResultBottomSheet.CANCEL", { name: mentee.name })}
          confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
        />
      )}
    </>
  );
};

const CoffeeChatDetailForMentee = ({ id }: CoffeeChatDetailProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

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
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
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
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("introductionOfMentor")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionToMentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason ?? coffeeChat.question}
            </p>
          </div>
        )}
        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionOfMentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.question}
            </p>
          </div>
        )}
        {isCancelable && (
          <Button
            variant="outline"
            color="grayscale"
            className="border-[0.5px]"
            onClick={setIsCancelTrue}
          >
            {t("cancel-coffeechat")}
          </Button>
        )}
      </div>
      {coffeeChat.status === "SUGGEST" && (
        <>
          <div className="h-[96px]" />
          <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
            <div className="flex gap-5">
              <Button variant="outline" onClick={setIsRejectTrue}>
                {t("reject-coffeechat")}
              </Button>
              <LinkButton href={`/schedule?mentor=${mentor.id}&coffeechat=${id}`}>
                {t("accept-coffeechat")}
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
          description={t("ResultBottomSheet.REJECT", { name: mentor.name })}
          confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
        />
      )}
      {isCancel && (
        <PendingBottomSheet
          resultType="negative"
          description={t("PendingBottomSheet.CANCEL", { name: mentor.name })}
          onClickNo={setIsCancelFalse}
          onClickYes={() => cancelCoffeeChat({ coffeeChatId: id })}
        />
      )}
      {isCancelSuccess && (
        <ResultBottomSheet
          resultType="negative"
          description={t("ResultBottomSheet.CANCEL", { name: mentor.name })}
          confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
        />
      )}
    </>
  );
};

export default Page;
