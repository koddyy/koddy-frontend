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

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {me.role === "mentor" && (
        <>
          {coffeeChat.status === "APPLY" && <MentorView.ApplyCoffeeChat id={coffeeChatId} />}
          {coffeeChat.status === "SUGGEST" && <MentorView.SuggestCoffeeChat id={coffeeChatId} />}
          {coffeeChat.status === "APPROVE" && <MentorView.ApproveCoffeeChat id={coffeeChatId} />}
          {coffeeChat.status === "COMPLETE" && <MentorView.CompleteCoffeeChat id={coffeeChatId} />}
          {coffeeChat.status === "CANCEL,REJECT" && (
            <MentorView.CancelAndRejectCoffeeChat id={coffeeChatId} />
          )}
        </>
      )}
      {me.role === "mentee" && (
        <>
          {coffeeChat.status === "APPLY" && <MenteeView.ApplyCoffeeChat id={coffeeChatId} />}
          {coffeeChat.status === "SUGGEST" && <MenteeView.SuggestCoffeeChat id={coffeeChatId} />}
          {coffeeChat.status === "APPROVE" && <MenteeView.ApproveCoffeeChat id={coffeeChatId} />}
          {coffeeChat.status === "COMPLETE" && <MenteeView.CompleteCoffeeChat id={coffeeChatId} />}
          {coffeeChat.status === "CANCEL,REJECT" && (
            <MenteeView.CancelAndRejectCoffeeChat id={coffeeChatId} />
          )}
        </>
      )}
    </>
  );
};

export default Page;
