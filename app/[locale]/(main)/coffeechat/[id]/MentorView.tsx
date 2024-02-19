import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import useCancelCoffeeChat from "@/app/[locale]/(main)/coffeechat/hooks/useCancelCoffeeChat";
import { Button, LinkButton } from "@/components/Button";
import { MenteeProfile } from "../../components/UserProfile";
import { CoffeeChatSchedule } from "../components/CoffeeChatSchedule";
import { CoffeeChatTypeSelectBottomSheet } from "../components/CoffeeChatTypeSelectBottomSheet";
import { RejectBottomSheet } from "../components/RejectBottomSheet";
import { ResultBottomSheet } from "../components/ResultBottomSheet/ResultBottomSheet";
import { useApproveCoffeeChatForMentor } from "../hooks/useApproveCoffeeChatForMentor";
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
    useApproveCoffeeChatForMentor(coffeeChat?.status);

  const { isReject, isRejectSuccess, toggleIsReject, rejectCoffeeChat } =
    useRejectCoffeeChatForMentor(coffeeChat?.status);

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTEE_APPLY") return null;

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`} />
      <div className="flex flex-col gap-[20px] px-[20px] py-[12px]">
        <div>
          <span className="body-3-bold mb-[0.38rem] inline-block">{t("introductionOfMentee")}</span>
          <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
            {mentee.introduction ?? "자기소개를 입력하지 않았어요."}
          </p>
        </div>
        {(coffeeChat.applyReason ?? coffeeChat.question) && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionOfMentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.applyReason ?? coffeeChat.question}
            </p>
          </div>
        )}
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
    </>
  );
};

const SuggestCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const { isCancelSuccess, cancelCoffeeChat } = useCancelCoffeeChat();

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTOR_SUGGEST") return null;

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
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
    useApproveCoffeeChatForMentor(coffeeChat?.status);

  const { isReject, isRejectSuccess, toggleIsReject, rejectCoffeeChat } =
    useRejectCoffeeChatForMentor(coffeeChat?.status);

  if (!mentee || !coffeeChat || coffeeChat.status !== "MENTEE_PENDING") return null;

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`} />
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
        {coffeeChat.question && (
          <div>
            <span className="body-3-bold mb-[0.38rem] inline-block">{t("questionOfMentee")}</span>
            <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
              {coffeeChat.question}
            </p>
          </div>
        )}
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
    </>
  );
};

const ApproveCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  const { isCancelSuccess, cancelCoffeeChat } = useCancelCoffeeChat();

  if (
    !mentee ||
    !coffeeChat ||
    !(coffeeChat.status === "MENTOR_APPROVE" || coffeeChat.status === "MENTOR_FINALLY_APPROVE")
  )
    return null;

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`} />
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

  const [date, startTime] = coffeeChat.start.split("T");
  const endTime = coffeeChat.end.split("T")?.[1];

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatSchedule schedule={`${date} ${startTime}~${endTime} (한국 시간 기준)`} />
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
      </div>
    </>
  );
};

const CancelAndRejectCoffeeChat = ({ id }: MentorViewProps) => {
  const t = useTranslations("coffeechat");
  const constants = useTranslations("constants");

  const { data, isLoading } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  if (isLoading) return null;

  if (
    !mentee ||
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
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
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
      </div>
    </>
  );
};

export const MentorView = {
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
