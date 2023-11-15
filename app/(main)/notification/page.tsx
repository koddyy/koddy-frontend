"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavigationBar } from "@/app/components/NavigationBar";
import ArrowRight from "@/assets/arrow_right.svg";
import { Divider } from "@/components/Divider/Divider";
import { CoffeeChatStatus, NotificationText } from "@/constants/notification";

const MOCK_NOTIFICATIIONS: Array<{
  id: number;
  name: string;
  status: CoffeeChatStatus;
  reason?: string;
}> = [
  { id: 1, name: "Le Minh C", status: "received" },
  { id: 2, name: "Mizuli Kiyoshi", status: "canceled", reason: "당분간 상담이 어려워요." },
];

const Page = ({
  searchParams,
}: {
  searchParams: {
    type: "mentor" | "mentee";
  };
}) => {
  const userType = searchParams.type ?? "mentor";
  const router = useRouter();

  return (
    <>
      <NavigationBar title="알림" onClickGoback={() => router.back()} />
      {MOCK_NOTIFICATIIONS.map(({ id, name, status, reason }) => (
        <>
          <Link
            href={`/coffeechat/${id}`}
            key={id}
            className="flex items-center justify-between px-5 py-4"
          >
            <div className="body-2">
              <div>{name + NotificationText[userType][status]}</div>
              {status === "canceled" && <div>(사유 : {reason})</div>}
            </div>
            <ArrowRight />
          </Link>
          <Divider />
        </>
      ))}
    </>
  );
};

export default Page;
