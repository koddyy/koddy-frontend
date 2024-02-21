import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import useCancelCoffeeChat from "@/app/[locale]/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { Button, LinkButton } from "@/components/Button";
import { MentorProfile } from "../../components/UserProfile";
import { CoffeeChatSchedule } from "../components/CoffeeChatSchedule";
import { RejectBottomSheet } from "../components/RejectBottomSheet";
import { ResultBottomSheet } from "../components/ResultBottomSheet/ResultBottomSheet";
import { useRejectCoffeeChatForMentee } from "../hooks/useRejectCoffeeChatForMentee";

interface MenteeViewProps {
  id: number;
}

const ApplyCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const { isCancel, isCancelSuccess, toggleIsCancel, cancelCoffeeChat } = useCancelCoffeeChat();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTEE_APPLY") return null;

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentor")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.applyReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason}
            </p>
          </div>
        )}
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
          userName={mentor.name}
          onClickRejectButton={(cancelReason) =>
            cancelCoffeeChat({ coffeeChatId: id, cancelReason })
          }
          onClose={toggleIsCancel}
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

const SuggestCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const { isReject, isRejectSuccess, setIsRejectTrue, setIsRejectFalse, rejectCoffeeChat } =
    useRejectCoffeeChatForMentee();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTOR_SUGGEST") return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentor")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
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
    </>
  );
};

const PendingCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const { isCancel, isCancelSuccess, toggleIsCancel, cancelCoffeeChat } = useCancelCoffeeChat();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTEE_PENDING") return null;

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentor")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
        {coffeeChat.question && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.question}
            </p>
          </div>
        )}
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
          userName={mentor.name}
          onClickRejectButton={(cancelReason) =>
            cancelCoffeeChat({ coffeeChatId: id, cancelReason })
          }
          onClose={toggleIsCancel}
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

const ApproveCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  const { isCancel, isCancelSuccess, toggleIsCancel, cancelCoffeeChat } = useCancelCoffeeChat();

  if (
    !mentor ||
    !coffeeChat ||
    !(coffeeChat.status === "MENTOR_APPROVE" || coffeeChat.status === "MENTOR_FINALLY_APPROVE")
  )
    return null;

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule
        schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`}
        chatType={coffeeChat.chatType}
        chatValue={coffeeChat.chatValue}
      />
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentor")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>

        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason ?? coffeeChat.question}
            </p>
          </div>
        )}
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
          userName={mentor.name}
          onClickRejectButton={(cancelReason) =>
            cancelCoffeeChat({ coffeeChatId: id, cancelReason })
          }
          onClose={toggleIsCancel}
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

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule
        schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`}
        chatType={coffeeChat.chatType}
        chatValue={coffeeChat.chatValue}
      />
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentor")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason ?? coffeeChat.question}
            </p>
          </div>
        )}
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

  const [date, startTime] = coffeeChat.start?.split("T") ?? [];
  const endTime = coffeeChat.end?.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentor")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason ?? coffeeChat.question}
            </p>
          </div>
        )}
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {coffeeChat.status === "MENTEE_REJECT" && t("reject-reason-of-me")}
            {coffeeChat.status === "MENTOR_REJECT" && t("reject-reason-of-mentor")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.rejectReason}
          </p>
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
      coffeeChat.status === "MENTOR_FINALLY_REJECT" ||
      coffeeChat.status === "MENTEE_CANCEL" ||
      coffeeChat.status === "MENTOR_CANCEL"
    )
  )
    return null;

  const [date, startTime] = coffeeChat.start?.split("T") ?? [];
  const endTime = coffeeChat.end?.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      {coffeeChat.start && coffeeChat.end && (
        <CoffeeChatSchedule
          schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`}
          chatType={coffeeChat.chatType}
          chatValue={coffeeChat.chatValue}
        />
      )}
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {t("introduction-of-mentor")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-of-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("question-to-mentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason ?? coffeeChat.question}
            </p>
          </div>
        )}
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">
            {coffeeChat.status === "MENTOR_FINALLY_REJECT" && t("cancel-reason-of-mentor")}
            {coffeeChat.status === "MENTOR_CANCEL" && t("cancel-reason-of-mentor")}
            {coffeeChat.status === "MENTEE_CANCEL" && t("cancel-reason-of-me")}
          </span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {coffeeChat.cancelReason}
          </p>
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
  MENTOR_FINALLY_REJECT: CancelCoffeeChat,
  MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE: CompleteCoffeeChat,

  MENTEE_CANCEL: CancelCoffeeChat,
  MENTOR_CANCEL: CancelCoffeeChat,
} as const;
