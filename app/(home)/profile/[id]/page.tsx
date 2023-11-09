"use client";

import { notFound, useRouter } from "next/navigation";
import { NavigationBar } from "@/app/_components/NavigationBar";
import { UserCard } from "@/app/_components/UserCard";
import { Button } from "@/components/Button";
import { MOCK_MENTEE, MOCK_MENTOR } from "@/mocks/dummy";

const Page = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const router = useRouter();

  if (id > 20) return notFound();

  const isMentor = id > 10;
  const mockData = isMentor ? MOCK_MENTOR : MOCK_MENTEE;

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
      />
      <UserCard cardType="vertical" {...mockData} />
      <div className="px-5 py-3 pb-[5.75rem]">
        <span className="body-3-bold mb-[0.38rem]">자기소개</span>
        <p className="body-1 rounded-[0.625rem] border border-gray-300 px-[1.125rem] py-[0.6875rem]">
          Duis quis incididunt deserunt exercitation cillum minim dolore mollit occaecat consequat
          tempor. Quis proident adipisicing exercitation ea duis. Non in nostrud commodo dolore
          fugiat occaecat consectetur proident esse id. Aliquip do mollit ut sit. Deserunt pariatur
          dolor eiusmod enim labore consequat eiusmod. Esse velit reprehenderit dolore tempor.
        </p>
      </div>
      <div className="sticky inset-x-5 bottom-[5.75rem] z-header border-t border-t-gray-200 bg-white px-5 py-[0.69rem] ">
        {isMentor ? <Button>커피챗 신청하기</Button> : <Button>커피챗 제안하기</Button>}
      </div>
    </>
  );
};

export default Page;
