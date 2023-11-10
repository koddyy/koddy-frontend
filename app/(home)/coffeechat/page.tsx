import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/app/_components/Header";
import { CoffeeChatCard } from "@/app/(home)/coffeechat/_components/CoffeeChatCard";
import { MOCK_MENTEE, MOCK_MENTOR } from "@/mocks/dummy";
import { CoffeeChatStatus } from "@/types/coffeechat";

const COFFEECHAT_STATUS: CoffeeChatStatus[] = [
  "expected",
  "requested",
  "recieved",
  "completed",
  "canceled",
];

// TODO: 유저를 구분하기 위한 임시 searchPamras, 추후 제거 예정
const Page = ({ searchParams }: { searchParams: { type: "mentor" | "mentee" } }) => {
  const type = searchParams.type;

  if (!type) return notFound();

  return (
    <>
      <Header />
      <div className="flex flex-col gap-[0.88rem] px-5 py-[0.87rem] pb-40">
        {type === "mentor" &&
          new Array(5).fill(0).map((_, i) => (
            <Link key={i} href={`/coffeechat/123456?status=${COFFEECHAT_STATUS[i]}`}>
              <CoffeeChatCard
                userType={type}
                coffeechatStatus={COFFEECHAT_STATUS[i]}
                userName={MOCK_MENTEE.name}
                {...MOCK_MENTEE}
              />
            </Link>
          ))}

        {type === "mentee" &&
          new Array(5).fill(0).map((_, i) => (
            <Link key={i} href={`/coffeechat/123456?status=${COFFEECHAT_STATUS[i]}`}>
              <CoffeeChatCard
                userType={type}
                coffeechatStatus={COFFEECHAT_STATUS[i]}
                userName={MOCK_MENTOR.name}
                {...MOCK_MENTOR}
              />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Page;
