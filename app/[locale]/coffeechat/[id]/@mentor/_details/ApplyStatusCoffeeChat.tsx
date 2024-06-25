import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { BottomSheet } from "@/components/BottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { PATH } from "@/constants/path";
import { useApplyToApproveCoffeeChat } from "@/features/coffeechat/hooks/useApplyToApproveCoffeeChat";
import { useRejectCoffeeChatForMentor } from "@/features/coffeechat/hooks/useRejectCoffeeChatForMentor";
import { CoffeeChatSchedule } from "@/features/coffeechat/ui/CoffeeChatSchedule";
import { CoffeeChatTypeSelect } from "@/features/coffeechat/ui/CoffeeChatTypeSelectBottomSheet";
import { QuestionToMentee } from "@/features/coffeechat/ui/QuestionToMenteeBottomSheet/QuestionToMenteeBottomSheet";
import { RejectReasonSelect } from "@/features/coffeechat/ui/RejectBottomSheet";
import { Result } from "@/features/coffeechat/ui/ResultBottomSheet/ResultBottomSheet";

export const ApplyStatusCoffeeChat = ({ id }: { id: number }) => {
  const t = useTranslations("coffeechat");

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
