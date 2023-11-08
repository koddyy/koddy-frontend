import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/app/_components/Header";
import { UserCard } from "@/app/_components/UserCard/UserCard";

const MOCK_MENTEE = {
  name: "Hường",
  description: "관심: 비사이드 대학교, 컴퓨터 공학과",
  nationality: "베트남인",
  languages: ["베트남어", "영어", "한국어"],
};

const MOCK_MENTOR = {
  name: "김호정",
  description: "비사이드 대학교 졸업, 컴퓨터 공학과",
  nationality: "한국인",
  languages: ["베트남어", "영어", "한국어"],
};

// TODO: searchParams 제거, 유저 정보로 type 구분
const Home = ({ searchParams }: { searchParams: { type: "mentor" | "mentee" } }) => {
  const { type } = searchParams;

  if (!(type === "mentor" || type === "mentee")) return notFound();

  return (
    <>
      <Header />
      {type === "mentor" && <MentorHome />}
      {type === "mentee" && <MenteeHome />}
    </>
  );
};

const MentorHome = () => {
  return (
    <div className="flex flex-col gap-4 px-5 pb-[5.75rem] pt-[0.87rem]">
      <>
        <div className="subheading-bold mb-3">예약을 신청한 멘티가 있어요</div>
        <Link href={`/coffeechat/${123456}`}>
          <UserCard {...MOCK_MENTEE} />
        </Link>
      </>
      <>
        <div className="subheading-bold mb-3">멘티 둘러보기</div>
        <div className="flex flex-col gap-[0.81rem]">
          {new Array(10).fill(0).map((_, i) => (
            <Link key={i} href={`/profile/${i + 1}`}>
              <UserCard {...MOCK_MENTEE} />
            </Link>
          ))}
        </div>
      </>
    </div>
  );
};

export const MenteeHome = () => {
  return (
    <div className="px-5 pb-[5.75rem] pt-[0.87rem]">
      <div className="subheading-bold mb-3">멘토 둘러보기</div>
      <div className="flex flex-col gap-[0.81rem]">
        {new Array(10).fill(0).map((_, i) => (
          <Link key={i} href={`/profile/${i + 1}`}>
            <UserCard imageUrl="/images/mock_profile2.png" {...MOCK_MENTOR} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
