import { UserCard } from "@/app/(main)/components/UserCard";

export const BrowseListSkeleton = () => {
  return (
    <div className="flex flex-col gap-[0.81rem]">
      {new Array(5).fill(0).map((_, i) => (
        <UserCard.HorizontalSkeleton key={i} />
      ))}
    </div>
  );
};
