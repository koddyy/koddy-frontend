"use client";

import useGetCoffeeChatById from "@/apis/coffeechat/hooks/useGetCoffeeChatById";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { useRouter } from "@/libs/navigation";
import { MenteeView } from "./MenteeView";
import { MentorView } from "./MentorView";

const Page = ({ params }: { params: { id: string } }) => {
  const coffeeChatId = Number(params.id);
  const router = useRouter();
  const { data: me } = useGetMe();
  const { data: coffeeChatDetail } = useGetCoffeeChatById(coffeeChatId);
  const { coffeeChat } = coffeeChatDetail ?? {};

  if (!me || !coffeeChat) return;

  const CoffeeChatDetail = {
    MentorView: MentorView[coffeeChat.status],
    MenteeView: MenteeView[coffeeChat.status],
  };

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {me.role === "mentor" && <CoffeeChatDetail.MentorView id={coffeeChatId} />}
      {me.role === "mentee" && <CoffeeChatDetail.MenteeView id={coffeeChatId} />}
    </>
  );
};

export default Page;
