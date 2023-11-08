import Link from "next/link";
import { Header } from "@/app/_components/Header";
import { UserCard } from "@/app/_components/UserCard/UserCard";

const MOCK_USER = {
  name: "Hường",
  description: "관심: 비사이드 대학교, 컴퓨터 공학과",
  nationality: "베트남인",
  languages: ["베트남어", "영어", "한국어"],
};

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 px-5 pb-[5.75rem] pt-[0.87rem]">
        <div>
          <div className="subheading-bold mb-3">예약을 신청한 멘티가 있어요</div>
          <Link href={`/coffeechat/${123456}`}>
            <UserCard {...MOCK_USER} />
          </Link>
        </div>
        <div>
          <div className="subheading-bold mb-3">멘티 둘러보기</div>
          <div className="flex flex-col gap-[0.81rem]">
            {new Array(10).fill(0).map((_, i) => (
              <Link key={i} href={`/profile/${i + 1}`}>
                <UserCard {...MOCK_USER} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
