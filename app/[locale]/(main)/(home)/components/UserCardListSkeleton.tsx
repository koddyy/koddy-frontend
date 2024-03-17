import { UserCard } from "@/components/UserCard";

export const UserCardListSkeleton = () => {
  return (
    <>
      <div className="mb-3 h-[1.5625rem] w-[12.5rem] rounded-xl bg-gray-100" />
      <div className="flex flex-col gap-[0.81rem]">
        {new Array(5).fill(0).map((_, i) => (
          <UserCard.Skeleton key={i} />
        ))}
      </div>
    </>
  );
};
