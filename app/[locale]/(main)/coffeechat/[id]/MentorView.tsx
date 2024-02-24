import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import useCancelCoffeeChat from "@/app/[locale]/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { Button, LinkButton } from "@/components/Button";
import { MenteeProfile } from "../../components/UserProfile";
import { ApproveStepsBottomSheet } from "../components/ApproveStepsBottomSheet";
import { CoffeeChatSchedule } from "../components/CoffeeChatSchedule";
import { CoffeeChatTypeSelectBottomSheet } from "../components/CoffeeChatTypeSelectBottomSheet";
import { RejectBottomSheet } from "../components/RejectBottomSheet";
import { ResultBottomSheet } from "../components/ResultBottomSheet/ResultBottomSheet";
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

  const { isApprove, isApproveSuccess, setIsApproveTrue, setIsApproveFalse, approveCoffeeChat } =
    useApplyToApproveCoffeeChat();

  const { isReject, isRejectSuccess, toggleIsReject, rejectCoffeeChat } =
    useRejectCoffeeChatForMentor();

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
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.applyReason}
          </p>
        </div>
      </div>
      <div className="h-[96px]" />
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white px-5 py-[0.69rem]">
        <div className="flex gap-5">
          <Button variant="outline" onClick={toggleIsReject}>
            {t("reject-coffeechat")}
          </Button>
          <Button onClick={setIsApproveTrue}>{t("accept-coffeechat")}</Button>
        </div>
      </div>
      {isApprove && (
        <ApproveStepsBottomSheet
          onClose={setIsApproveFalse}
          onSubmit={(data) => approveCoffeeChat({ coffeeChatId: id, ...data })}
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
    </>
  );
};

const SuggestCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const { isCancel, isCancelSuccess, toggleIsCancel, cancelCoffeeChat } = useCancelCoffeeChat();

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTOR_SUGGEST") return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.suggestReason}
          </p>
        </div>
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={toggleIsCancel}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>
      {isCancel && (
        <RejectBottomSheet
          type="cancel"
          userName={mentee.name}
          onClickRejectButton={(cancelReason) =>
            cancelCoffeeChat({ coffeeChatId: id, cancelReason })
          }
          onClose={toggleIsCancel}
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

const PendingCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const { isApprove, isApproveSuccess, setIsApproveTrue, setIsApproveFalse, approveCoffeeChat } =
    usePendingToApproveCoffeeChat();

  const { isCancel, isCancelSuccess, toggleIsCancel, cancelCoffeeChat } =
    usePendingToFinallyCancelCoffeeChat();

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
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.question}
          </p>
        </div>
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.suggestReason}
          </p>
        </div>
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={toggleIsCancel}
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
      {isApprove && (
        <CoffeeChatTypeSelectBottomSheet
          onClose={setIsApproveFalse}
          onClickNext={({ chatType, chatValue }) =>
            approveCoffeeChat({ coffeeChatId: id, chatType, chatValue })
          }
        />
      )}
      {isApproveSuccess && (
        <ResultBottomSheet
          resultType="positive"
          description={t("ResultBottomSheet.APPROVE", { name: mentee.name })}
          confirmButton={<LinkButton href="/">{t("ResultBottomSheet.go-to-calendar")}</LinkButton>}
        />
      )}
      {isCancel && (
        <RejectBottomSheet
          type="cancel"
          userName={mentee.name}
          onClickRejectButton={(cancelReason) =>
            cancelCoffeeChat({ coffeeChatId: id, cancelReason })
          }
          onClose={toggleIsCancel}
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

const ApproveCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const { isCancel, isCancelSuccess, toggleIsCancel, cancelCoffeeChat } = useCancelCoffeeChat();

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
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.status === "MENTOR_APPROVE" && coffeeChat.applyReason}
              {coffeeChat.status === "MENTOR_FINALLY_APPROVE" && coffeeChat.question}
            </p>
          </div>
        )}
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.status === "MENTOR_APPROVE" && coffeeChat.question}
            {coffeeChat.status === "MENTOR_FINALLY_APPROVE" && coffeeChat.suggestReason}
          </p>
        </div>
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={toggleIsCancel}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>
      {isCancel && (
        <RejectBottomSheet
          type="cancel"
          userName={mentee.name}
          onClickRejectButton={(cancelReason) =>
            cancelCoffeeChat({ coffeeChatId: id, cancelReason })
          }
          onClose={toggleIsCancel}
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
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.status === "MENTEE_APPLY_COFFEE_CHAT_COMPLETE" && coffeeChat.applyReason}
            {coffeeChat.status === "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE" && coffeeChat.question}
          </p>
        </div>
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
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
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.status === "MENTOR_REJECT" && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason}
            </p>
          </div>
        )}
        {coffeeChat.status === "MENTEE_REJECT" && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {coffeeChat.status === "MENTOR_REJECT" && t("reject-reason-of-me")}
            {coffeeChat.status === "MENTEE_REJECT" && t("reject-reason-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.rejectReason}
          </p>
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
      coffeeChat.status === "MENTEE_CANCEL" ||
      coffeeChat.status === "MENTOR_CANCEL"
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
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason ?? coffeeChat.question}
            </p>
          </div>
        )}
        {(coffeeChat.suggestReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason ?? coffeeChat.question}
            </p>
          </div>
        )}
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {coffeeChat.status === "MENTOR_FINALLY_CANCEL" && t("cancel-reason-of-me")}
            {coffeeChat.status === "MENTOR_CANCEL" && t("cancel-reason-of-me")}
            {coffeeChat.status === "MENTEE_CANCEL" && t("cancel-reason-of-mentee")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.cancelReason}
          </p>
        </div>
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

  MENTEE_CANCEL: CancelCoffeeChat,
  MENTOR_CANCEL: CancelCoffeeChat,
} as const;
