import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import useCancelCoffeeChat from "@/app/[locale]/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { BottomSheet } from "@/components/BottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { MenteeProfile } from "@/components/UserProfile";
import { PATH } from "@/constants/path";
import { CoffeeChatSchedule } from "../components/CoffeeChatSchedule";
import { CoffeeChatTypeSelect } from "../components/CoffeeChatTypeSelectBottomSheet";
import { QuestionToMentee } from "../components/QuestionToMenteeBottomSheet/QuestionToMenteeBottomSheet";
import { RejectReasonSelect } from "../components/RejectBottomSheet";
import { Result } from "../components/ResultBottomSheet/ResultBottomSheet";
import { useApplyToApproveCoffeeChat } from "../hooks/useApplyToApproveCoffeeChat";
import { usePendingToApproveCoffeeChat } from "../hooks/usePendingToApproveCoffeeChat";
import { usePendingToFinallyCancelCoffeeChat } from "../hooks/usePendingToFinallyCancelCoffeeChat";
import { useRejectCoffeeChatForMentor } from "../hooks/useRejectCoffeeChatForMentor";

interface MentorViewProps {
  id: number;
}

const ApplyCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const {
    isApprove,
    setIsApproveTrue,
    setIsApproveFalse,
    approveStep,
    lastApproveStep,
    goToNextApproveStep,
    coffeeChatMethod,
    setCoffeeChatMethod,
    approveCoffeeChat,
  } = useApplyToApproveCoffeeChat();

  const {
    isReject,
    setIsRejectTrue,
    setIsRejectFalse,
    rejectStep,
    lastRejectStep,
    goToNextRejectStep,
    rejectCoffeeChat,
  } = useRejectCoffeeChatForMentor();

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTEE_APPLY") return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule startTime={coffeeChat.start} endTime={coffeeChat.end} />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentee")}</span>
          <p className="text-box">{coffeeChat.applyReason}</p>
        </div>
      </div>
      <div className="h-[96px]" />
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <div className="flex gap-5">
          <Button variant="outline" onClick={setIsRejectTrue}>
            {t("reject-coffeechat")}
          </Button>
          <Button onClick={setIsApproveTrue}>{t("accept-coffeechat")}</Button>
        </div>
      </div>

      <BottomSheet isOpen={isApprove} onClose={lastApproveStep ? null : setIsApproveFalse}>
        {approveStep === 1 && (
          <CoffeeChatTypeSelect
            onClickNext={({ chatType, chatValue }) => {
              setCoffeeChatMethod({ chatType, chatValue });
              goToNextApproveStep();
            }}
          />
        )}
        {approveStep === 2 && (
          <QuestionToMentee
            onSubmit={(question) => {
              if (coffeeChatMethod) {
                approveCoffeeChat(
                  {
                    coffeeChatId: id,
                    question,
                    ...coffeeChatMethod,
                  },
                  {
                    onSuccess: () => {
                      goToNextApproveStep();
                    },
                  }
                );
              }
            }}
          />
        )}
        {approveStep === 3 && (
          <Result
            resultType="positive"
            description={t("ResultBottomSheet.APPROVE", { name: mentee.name })}
            confirmButton={
              <LinkButton href={PATH.COFFEECHAT + "?category=scheduled"}>
                {t("ResultBottomSheet.go-to-calendar")}
              </LinkButton>
            }
          />
        )}
      </BottomSheet>

      <BottomSheet isOpen={isReject} onClose={lastRejectStep ? null : setIsRejectFalse}>
        {rejectStep === 1 && (
          <RejectReasonSelect
            userName={mentee.name}
            onClickRejectButton={(rejectReason) =>
              rejectCoffeeChat(
                { coffeeChatId: id, rejectReason },
                {
                  onSuccess: () => {
                    goToNextRejectStep();
                  },
                }
              )
            }
          />
        )}
        {rejectStep === 2 && (
          <Result
            resultType="negative"
            description={t("ResultBottomSheet.REJECT", { name: mentee.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};

const SuggestCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const {
    isCancel,
    setIsCancelTrue,
    setIsCancelFalse,
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat,
  } = useCancelCoffeeChat();

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTOR_SUGGEST") return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentee")}</span>
          <p className="text-box">{coffeeChat.suggestReason}</p>
        </div>
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={setIsCancelTrue}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>

      <BottomSheet isOpen={isCancel} onClose={lastCancelStep ? null : setIsCancelFalse}>
        {cancelStep === 1 && (
          <RejectReasonSelect
            type="cancel"
            userName={mentee.name}
            onClickRejectButton={(cancelReason) =>
              cancelCoffeeChat(
                { coffeeChatId: id, cancelReason },
                {
                  onSuccess: () => {
                    goToNextCancelStep();
                  },
                }
              )
            }
          />
        )}
        {cancelStep === 2 && (
          <Result
            resultType="negative"
            description={t("ResultBottomSheet.CANCEL", { name: mentee.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};

const PendingCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const {
    isApprove,
    setIsApproveTrue,
    setIsApproveFalse,
    approveStep,
    lastApproveStep,
    goToNextApproveStep,
    approveCoffeeChat,
  } = usePendingToApproveCoffeeChat();

  const {
    isCancel,
    setIsCancelTrue,
    setIsCancelFalse,
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat,
  } = usePendingToFinallyCancelCoffeeChat();

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTEE_PENDING") return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule startTime={coffeeChat.start} endTime={coffeeChat.end} />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentee")}</span>
          <p className="text-box">{coffeeChat.question}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentee")}</span>
          <p className="text-box">{coffeeChat.suggestReason}</p>
        </div>
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={setIsCancelTrue}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>
      <div className="h-[96px]" />
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <div className="flex gap-5">
          <Button onClick={setIsApproveTrue}>{t("finally-accept-coffeechat")}</Button>
        </div>
      </div>

      <BottomSheet isOpen={isApprove} onClose={lastApproveStep ? null : setIsApproveFalse}>
        {approveStep === 1 && (
          <CoffeeChatTypeSelect
            onClickNext={({ chatType, chatValue }) =>
              approveCoffeeChat(
                { coffeeChatId: id, chatType, chatValue },
                {
                  onSuccess: () => {
                    goToNextApproveStep();
                  },
                }
              )
            }
          />
        )}
        {approveStep === 2 && (
          <Result
            resultType="positive"
            description={t("ResultBottomSheet.APPROVE", { name: mentee.name })}
            confirmButton={
              <LinkButton href={PATH.COFFEECHAT + "?category=scheduled"}>
                {t("ResultBottomSheet.go-to-calendar")}
              </LinkButton>
            }
          />
        )}
      </BottomSheet>

      <BottomSheet isOpen={isCancel} onClose={lastCancelStep ? null : setIsCancelFalse}>
        {cancelStep === 1 && (
          <RejectReasonSelect
            type="cancel"
            userName={mentee.name}
            onClickRejectButton={(cancelReason) =>
              cancelCoffeeChat(
                { coffeeChatId: id, cancelReason },
                {
                  onSuccess: () => {
                    goToNextCancelStep();
                  },
                }
              )
            }
          />
        )}
        {cancelStep === 2 && (
          <Result
            resultType="negative"
            description={t("ResultBottomSheet.CANCEL", { name: mentee.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};

const ApproveCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const {
    isCancel,
    setIsCancelTrue,
    setIsCancelFalse,
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat,
  } = useCancelCoffeeChat();

  if (
    !mentee ||
    !coffeeChat ||
    !(coffeeChat.status === "MENTOR_APPROVE" || coffeeChat.status === "MENTOR_FINALLY_APPROVE")
  )
    return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule
        startTime={coffeeChat.start}
        endTime={coffeeChat.end}
        chatType={coffeeChat.chatType}
        chatValue={coffeeChat.chatValue}
      />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-of-mentee")}</span>
            <p className="text-box">
              {coffeeChat.status === "MENTOR_APPROVE" && coffeeChat.applyReason}
              {coffeeChat.status === "MENTOR_FINALLY_APPROVE" && coffeeChat.question}
            </p>
          </div>
        )}
        <div>
          <span className="text-box-label">{t("question-to-mentee")}</span>
          <p className="text-box">
            {coffeeChat.status === "MENTOR_APPROVE" && coffeeChat.question}
            {coffeeChat.status === "MENTOR_FINALLY_APPROVE" && coffeeChat.suggestReason}
          </p>
        </div>
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={setIsCancelTrue}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>

      <BottomSheet isOpen={isCancel} onClose={lastCancelStep ? null : setIsCancelFalse}>
        {cancelStep === 1 && (
          <RejectReasonSelect
            type="cancel"
            userName={mentee.name}
            onClickRejectButton={(cancelReason) =>
              cancelCoffeeChat(
                { coffeeChatId: id, cancelReason },
                {
                  onSuccess: () => {
                    goToNextCancelStep();
                  },
                }
              )
            }
          />
        )}
        {cancelStep === 2 && (
          <Result
            resultType="negative"
            description={t("ResultBottomSheet.CANCEL", { name: mentee.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};

const CompleteCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  if (
    !mentee ||
    !coffeeChat ||
    !(
      coffeeChat.status === "MENTEE_APPLY_COFFEE_CHAT_COMPLETE" ||
      coffeeChat.status === "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE"
    )
  )
    return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule
        startTime={coffeeChat.start}
        endTime={coffeeChat.end}
        chatType={coffeeChat.chatType}
        chatValue={coffeeChat.chatValue}
      />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentee")}</span>
          <p className="text-box">
            {coffeeChat.status === "MENTEE_APPLY_COFFEE_CHAT_COMPLETE" && coffeeChat.applyReason}
            {coffeeChat.status === "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE" && coffeeChat.question}
          </p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentee")}</span>
          <p className="text-box">
            {coffeeChat.status === "MENTEE_APPLY_COFFEE_CHAT_COMPLETE" && coffeeChat.question}
            {coffeeChat.status === "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE" &&
              coffeeChat.suggestReason}
          </p>
        </div>
      </div>
    </>
  );
};

const RejectCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data, isLoading } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  if (isLoading) return null;

  if (
    !mentee ||
    !coffeeChat ||
    !(coffeeChat.status === "MENTEE_REJECT" || coffeeChat.status === "MENTOR_REJECT")
  )
    return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          startTime={coffeeChat.start}
          endTime={coffeeChat.end}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        {coffeeChat.status === "MENTOR_REJECT" && (
          <div>
            <span className="text-box-label">{t("question-of-mentee")}</span>
            <p className="text-box">{coffeeChat.applyReason}</p>
          </div>
        )}
        {coffeeChat.status === "MENTEE_REJECT" && (
          <div>
            <span className="text-box-label">{t("question-to-mentee")}</span>
            <p className="text-box">{coffeeChat.suggestReason}</p>
          </div>
        )}
        <div>
          <span className="text-box-label">
            {coffeeChat.status === "MENTOR_REJECT" && t("reject-reason-of-me")}
            {coffeeChat.status === "MENTEE_REJECT" && t("reject-reason-of-mentee")}
          </span>
          <p className="text-box">{coffeeChat.rejectReason}</p>
        </div>
      </div>
    </>
  );
};

const CancelCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data, isLoading } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  if (isLoading) return null;

  if (
    !mentee ||
    !coffeeChat ||
    !(
      coffeeChat.status === "MENTOR_FINALLY_CANCEL" ||
      coffeeChat.status === "CANCEL_FROM_MENTEE_FLOW" ||
      coffeeChat.status === "CANCEL_FROM_MENTOR_FLOW"
    )
  )
    return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          startTime={coffeeChat.start}
          endTime={coffeeChat.end}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-of-mentee")}</span>
            <p className="text-box">{coffeeChat.applyReason ?? coffeeChat.question}</p>
          </div>
        )}
        {(coffeeChat.suggestReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-to-mentee")}</span>
            <p className="text-box">{coffeeChat.suggestReason ?? coffeeChat.question}</p>
          </div>
        )}
        <div>
          <span className="text-box-label">
            {coffeeChat.status === "MENTOR_FINALLY_CANCEL" && t("cancel-reason-of-me")}
            {coffeeChat.status === "CANCEL_FROM_MENTOR_FLOW" && t("cancel-reason-of-me")}
            {coffeeChat.status === "CANCEL_FROM_MENTEE_FLOW" && t("cancel-reason-of-mentee")}
          </span>
          <p className="text-box">{coffeeChat.cancelReason}</p>
        </div>
      </div>
    </>
  );
};

export const AutoCancelCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data, isLoading } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  if (isLoading) return null;

  if (
    !mentee ||
    !coffeeChat ||
    !(
      coffeeChat.status === "AUTO_CANCEL_FROM_MENTEE_FLOW" ||
      coffeeChat.status === "AUTO_CANCEL_FROM_MENTOR_FLOW"
    )
  )
    return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
        isAutoCancel
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          startTime={coffeeChat.start}
          endTime={coffeeChat.end}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentee")}</span>
          <p className="text-box">{mentee.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-of-mentee")}</span>
            <p className="text-box">{coffeeChat.applyReason ?? coffeeChat.question}</p>
          </div>
        )}
        {(coffeeChat.suggestReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-to-mentee")}</span>
            <p className="text-box">{coffeeChat.suggestReason ?? coffeeChat.question}</p>
          </div>
        )}
      </div>
    </>
  );
};

export const MentorView = {
  MENTEE_APPLY: ApplyCoffeeChat,
  MENTOR_APPROVE: ApproveCoffeeChat,
  MENTOR_REJECT: RejectCoffeeChat,
  MENTEE_APPLY_COFFEE_CHAT_COMPLETE: CompleteCoffeeChat,

  MENTOR_SUGGEST: SuggestCoffeeChat,
  MENTEE_PENDING: PendingCoffeeChat,
  MENTEE_REJECT: RejectCoffeeChat,
  MENTOR_FINALLY_APPROVE: ApproveCoffeeChat,
  MENTOR_FINALLY_CANCEL: CancelCoffeeChat,
  MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE: CompleteCoffeeChat,

  CANCEL_FROM_MENTEE_FLOW: CancelCoffeeChat,
  CANCEL_FROM_MENTOR_FLOW: CancelCoffeeChat,

  AUTO_CANCEL_FROM_MENTEE_FLOW: AutoCancelCoffeeChat,
  AUTO_CANCEL_FROM_MENTOR_FLOW: AutoCancelCoffeeChat,
} as const;
