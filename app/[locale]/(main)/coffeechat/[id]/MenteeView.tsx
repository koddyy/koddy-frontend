import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import useCancelCoffeeChat from "@/app/[locale]/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { BottomSheet } from "@/components/BottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { MentorProfile } from "../../components/UserProfile";
import { CoffeeChatSchedule } from "../components/CoffeeChatSchedule";
import { RejectReasonSelect } from "../components/RejectBottomSheet";
import { Result } from "../components/ResultBottomSheet/ResultBottomSheet";
import { useRejectCoffeeChatForMentee } from "../hooks/useRejectCoffeeChatForMentee";

interface MenteeViewProps {
  id: number;
}

const ApplyCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const {
    isCancel,
    setIsCancelTrue,
    setIsCancelFalse,
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat,
  } = useCancelCoffeeChat();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTEE_APPLY") return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule startTime={coffeeChat.start} endTime={coffeeChat.end} />
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentor")}</span>
          <p className="text-box">{coffeeChat.applyReason}</p>
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
            userName={mentor.name}
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
            description={t("ResultBottomSheet.CANCEL", { name: mentor.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};

const SuggestCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const {
    isReject,
    setIsRejectTrue,
    setIsRejectFalse,
    rejectStep,
    lastRejectStep,
    goToNextRejectStep,
    rejectCoffeeChat,
  } = useRejectCoffeeChatForMentee();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTOR_SUGGEST") return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentor")}</span>
          <p className="text-box">{coffeeChat.suggestReason}</p>
        </div>
      </div>
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

      <BottomSheet isOpen={isReject} onClose={lastRejectStep ? null : setIsRejectFalse}>
        {rejectStep === 1 && (
          <RejectReasonSelect
            userName={mentor.name}
            onClickRejectButton={(rejectReason: string) =>
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
            description={t("ResultBottomSheet.REJECT", { name: mentor.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};

const PendingCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const {
    isCancel,
    setIsCancelTrue,
    setIsCancelFalse,
    cancelStep,
    goToNextCancelStep,
    lastCancelStep,
    cancelCoffeeChat,
  } = useCancelCoffeeChat();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTEE_PENDING") return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule startTime={coffeeChat.start} endTime={coffeeChat.end} />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentor")}</span>
          <p className="text-box">{coffeeChat.suggestReason}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentor")}</span>
          <p className="text-box">{coffeeChat.question}</p>
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
            userName={mentor.name}
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
            description={t("ResultBottomSheet.CANCEL", { name: mentor.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};

const ApproveCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

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
    !mentor ||
    !coffeeChat ||
    !(coffeeChat.status === "MENTOR_APPROVE" || coffeeChat.status === "MENTOR_FINALLY_APPROVE")
  )
    return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule
        startTime={coffeeChat.start}
        endTime={coffeeChat.end}
        chatType={coffeeChat.chatType}
        chatValue={coffeeChat.chatValue}
      />
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentor")}</span>
          <p className="text-box">
            {coffeeChat.status === "MENTOR_APPROVE" && coffeeChat.question}
            {coffeeChat.status === "MENTOR_FINALLY_APPROVE" && coffeeChat.suggestReason}
          </p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentor")}</span>
          <p className="text-box">
            {coffeeChat.status === "MENTOR_APPROVE" && coffeeChat.applyReason}
            {coffeeChat.status === "MENTOR_FINALLY_APPROVE" && coffeeChat.question}
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
            userName={mentor.name}
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
            description={t("ResultBottomSheet.CANCEL", { name: mentor.name })}
            confirmButton={<LinkButton href="/">{t("ResultBottomSheet.return-home")}</LinkButton>}
          />
        )}
      </BottomSheet>
    </>
  );
};

const CompleteCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  if (
    !mentor ||
    !coffeeChat ||
    !(
      coffeeChat.status === "MENTEE_APPLY_COFFEE_CHAT_COMPLETE" ||
      coffeeChat.status === "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE"
    )
  )
    return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule
        startTime={coffeeChat.start}
        endTime={coffeeChat.end}
        chatType={coffeeChat.chatType}
        chatValue={coffeeChat.chatValue}
      />
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        <div>
          <span className="text-box-label">{t("question-of-mentor")}</span>
          <p className="text-box">
            {coffeeChat.status === "MENTEE_APPLY_COFFEE_CHAT_COMPLETE" && coffeeChat.question}
            {coffeeChat.status === "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE" &&
              coffeeChat.suggestReason}
          </p>
        </div>
        <div>
          <span className="text-box-label">{t("question-to-mentor")}</span>
          <p className="text-box">
            {coffeeChat.status === "MENTEE_APPLY_COFFEE_CHAT_COMPLETE" && coffeeChat.applyReason}
            {coffeeChat.status === "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE" && coffeeChat.question}
          </p>
        </div>
      </div>
    </>
  );
};

const RejectCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  if (
    !mentor ||
    !coffeeChat ||
    !(coffeeChat.status === "MENTEE_REJECT" || coffeeChat.status === "MENTOR_REJECT")
  )
    return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          startTime={coffeeChat.start}
          endTime={coffeeChat.end}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        {coffeeChat.status === "MENTEE_REJECT" && (
          <div>
            <span className="text-box-label">{t("question-of-mentor")}</span>
            <p className="text-box">{coffeeChat.suggestReason}</p>
          </div>
        )}
        {coffeeChat.status === "MENTOR_REJECT" && (
          <div>
            <span className="text-box-label">{t("question-to-mentor")}</span>
            <p className="text-box">{coffeeChat.applyReason}</p>
          </div>
        )}
        <div>
          <span className="text-box-label">
            {coffeeChat.status === "MENTEE_REJECT" && t("reject-reason-of-me")}
            {coffeeChat.status === "MENTOR_REJECT" && t("reject-reason-of-mentor")}
          </span>
          <p className="text-box">{coffeeChat.rejectReason}</p>
        </div>
      </div>
    </>
  );
};

const CancelCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  if (
    !mentor ||
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
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          startTime={coffeeChat.start}
          endTime={coffeeChat.end}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="text-box-label">{t("introduction-of-mentor")}</span>
          <p className="text-box">{mentor.introduction || "자기소개를 입력하지 않았어요."}</p>
        </div>
        {(coffeeChat.suggestReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-of-mentor")}</span>
            <p className="text-box">{coffeeChat.suggestReason ?? coffeeChat.question}</p>
          </div>
        )}
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="text-box-label">{t("question-to-mentor")}</span>
            <p className="text-box">{coffeeChat.applyReason ?? coffeeChat.question}</p>
          </div>
        )}
        <div>
          <span className="text-box-label">
            {coffeeChat.status === "MENTOR_FINALLY_CANCEL" && t("cancel-reason-of-mentor")}
            {coffeeChat.status === "CANCEL_FROM_MENTOR_FLOW" && t("cancel-reason-of-mentor")}
            {coffeeChat.status === "CANCEL_FROM_MENTEE_FLOW" && t("cancel-reason-of-me")}
          </span>
          <p className="text-box">{coffeeChat.cancelReason}</p>
        </div>
      </div>
    </>
  );
};

export const MenteeView = {
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
} as const;
