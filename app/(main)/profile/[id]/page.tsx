"use client";

import { useRouter } from "next/navigation";
import { useGetUserById } from "@/apis/user/hooks/useGetUserById";
import { NavigationBar } from "@/app/components/NavigationBar";
import { MenteeProfile } from "./MenteeProfile";
import { MentorProfile } from "./MentorProfile";

const Page = ({ params }: { params: { id: string } }) => {
  const userId = Number(params.id);
  const router = useRouter();
  const { data: user } = useGetUserById(userId);

  if (!user) return null;

  if (isNaN(userId)) return null;

  return (
    <>
      <NavigationBar
        className="absolute border-none bg-transparent"
        onClickGoback={() => router.back()}
        backButtonColor="white"
      />
      {user.role === "mentor" && <MentorProfile mentorId={userId} />}
      {user.role === "mentee" && <MenteeProfile menteeId={userId} />}
    </>
  );
};
export default Page;
