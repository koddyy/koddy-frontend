import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { BottomSheet } from "@/components/BottomSheet";
import { Button, LinkButton } from "@/components/Button";
import { useRejectCoffeeChatForMentee } from "@/features/coffeechat/hooks/useRejectCoffeeChatForMentee";
import { RejectReasonSelect } from "@/features/coffeechat/ui/RejectBottomSheet";
import { Result } from "@/features/coffeechat/ui/ResultBottomSheet/ResultBottomSheet";

export const SuggestStatusCoffeeChat = ({ id }: { id: number }) => {
  const t = useTranslations("coffeechat");

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
