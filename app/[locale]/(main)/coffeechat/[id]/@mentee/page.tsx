"use client";

import { useTranslations } from "next-intl";
import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { MentorProfile } from "@/components/UserProfile";
import { MenteeView } from "./MenteeView";

const Page = ({ params }: { params: { id: string } }) => {
  const constants = useTranslations("constants");

  const coffeeChatId = Number(params.id);
  const { data: coffeeChatDetail, isFetching } = useGetCoffeeChatById(coffeeChatId);
  const { coffeeChat, mentor } = coffeeChatDetail ?? {};

  if (!coffeeChat || !mentor || isFetching) return null;

  const CoffeeChatDetail = MenteeView[coffeeChat.status];

  return (
    <>
      <MentorProfile
        {...mentor}
        coffeeChatStatusText={constants(`coffeechat-status-text.mentee.${coffeeChat.status}`)}
      />
      <CoffeeChatDetail id={coffeeChatId} />
    </>
  );
};

export default Page;
