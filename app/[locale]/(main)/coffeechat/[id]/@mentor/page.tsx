"use client";

import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { MenteeProfile } from "@/components/UserProfile";
import { MentorView } from "./MentorView";

const Page = ({ params }: { params: { id: string } }) => {
  const constants = useTranslations("constants");

  const coffeeChatId = Number(params.id);
  const { data: coffeeChatDetail, isFetching } = useGetCoffeeChatById(coffeeChatId);
  const { coffeeChat, mentee } = coffeeChatDetail ?? {};

  if (!coffeeChat || !mentee || isFetching) return null;

  const CoffeeChatDetail = MentorView[coffeeChat.status];

  return (
    <>
      <MenteeProfile
        {...mentee}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentor.${coffeeChat.status}`)}
      />
      <CoffeeChatDetail id={coffeeChatId} />
    </>
  );
};

export default Page;
