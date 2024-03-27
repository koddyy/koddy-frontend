import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { CoffeeChatSchedule } from "../../../components/CoffeeChatSchedule";

export const RejectStatusCoffeeChat = ({ id }: { id: number }) => {
  const t = useTranslations("coffeechat");

  const { data } = useGetCoffeeChatById(id);
  const { mentee, coffeeChat } = data ?? {};

  if (
    !mentee ||
    !coffeeChat ||
    !(coffeeChat.status === "MENTEE_REJECT" || coffeeChat.status === "MENTOR_REJECT")
  )
    return null;

  return (
    <>
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
