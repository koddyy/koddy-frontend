import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { CoffeeChatSchedule } from "../../../components/CoffeeChatSchedule";

export const CompleteStatusCoffeeChat = ({ id }: { id: number }) => {
  const t = useTranslations("coffeechat");

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
