"use client";

import { BrowseMenteeList } from "../../components/BrowseMenteeList";
import { BrowseMentorList } from "../../components/BrowseMentorList";

const Page = ({ searchParams }: { searchParams: { explore: string } }) => {
  const explore = searchParams.explore === "mentor" ? "mentor" : "mentee";

  return (
    <div className="px-[20px]">
      {explore === "mentee" && <BrowseMenteeList />}
      {explore === "mentor" && <BrowseMentorList />}
    </div>
  );
};

export default Page;
