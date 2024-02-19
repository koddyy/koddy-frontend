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

  const { isCancelSuccess, cancelCoffeeChat } = useCancelCoffeeChat();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTEE_APPLY") return null;

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`} />
      <div className="mb-[20px] flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("introductionOfMentor")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.applyReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionToMentor")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason}
            </p>
          </div>
        )}
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={() => cancelCoffeeChat({ coffeeChatId: id })}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>
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
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("introductionOfMentor")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction || "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {coffeeChat.suggestReason && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionOfMentor")}</span>
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

  const { isCancelSuccess, cancelCoffeeChat } = useCancelCoffeeChat();

  if (!mentor || !coffeeChat || coffeeChat.status !== "MENTEE_PENDING") return null;

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`} />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("introductionOfMentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentor.introduction ?? "자기소개를 입력하지 않았어요."}
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
        {coffeeChat.question && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionOfMentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.question}
            </p>
          </div>
        )}
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={() => cancelCoffeeChat({ coffeeChatId: id })}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>
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

  const { isCancelSuccess, cancelCoffeeChat } = useCancelCoffeeChat();

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
      <CoffeeChatSchedule schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`} />
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
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
        <Button
          variant="outline"
          color="grayscale"
          className="border-[0.5px]"
          onClick={() => cancelCoffeeChat({ coffeeChatId: id })}
        >
          {t("cancel-coffeechat")}
        </Button>
      </div>
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
      <CoffeeChatSchedule schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`} />
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
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const CancelAndRejectCoffeeChat = ({ id }: MenteeViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentor, coffeeChat } = data ?? {};

  if (
    !mentor ||
    !coffeeChat ||
    !(
      coffeeChat.status === "MENTEE_CANCEL" ||
      coffeeChat.status === "MENTOR_CANCEL" ||
      coffeeChat.status === "MENTEE_REJECT" ||
      coffeeChat.status === "MENTOR_REJECT" ||
      coffeeChat.status === "MENTOR_FINALLY_REJECT"
    )
  )
    return null;

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
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
              {coffeeChat.suggestReason}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export const MenteeView = {
  MENTEE_APPLY: ApplyCoffeeChat,
  MENTOR_APPROVE: ApproveCoffeeChat,
  MENTOR_REJECT: CancelAndRejectCoffeeChat,
  MENTEE_APPLY_COFFEE_CHAT_COMPLETE: CompleteCoffeeChat,

  MENTOR_SUGGEST: SuggestCoffeeChat,
  MENTEE_PENDING: PendingCoffeeChat,
  MENTEE_REJECT: CancelAndRejectCoffeeChat,
  MENTOR_FINALLY_APPROVE: ApproveCoffeeChat,
  MENTOR_FINALLY_REJECT: CancelAndRejectCoffeeChat,
  MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE: CompleteCoffeeChat,

  MENTEE_CANCEL: CancelAndRejectCoffeeChat,
  MENTOR_CANCEL: CancelAndRejectCoffeeChat,
} as const;
