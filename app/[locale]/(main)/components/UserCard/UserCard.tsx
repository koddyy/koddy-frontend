import { GetMenteeListResponse, GetMentorListResponse } from "@/apis/user/types";
import { DefaultProfileImageUrl } from "@/constants/profile";
import { cn } from "@/utils/cn";
import { getDescription } from "@/utils/profile";

export type UserCardProps =
  | (GetMentorListResponse["result"][number] & { role: "mentor" })
  | (GetMenteeListResponse["result"][number] & { role: "mentee" });

export const UserCard = ({ ...user }: UserCardProps) => {
  const description = getDescription(user);
  const { profileImageUrl, name } = user;

  return (
    <div className="flex justify-between gap-[1.13rem] rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img
          className={cn(
            "h-20 w-20 rounded-lg object-cover",
            !profileImageUrl && "border border-gray-300 object-contain p-[0.3rem]"
          )}
          src={profileImageUrl || DefaultProfileImageUrl[user.role]}
        />
      </div>
      <div className="flex grow flex-col justify-center">
        <div className="subheading-bold mb-[0.13rem]">{name}</div>
        <p className="body-2 line-clamp-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const UserCardSkeleton = () => {
  return <div className="h-[6.5rem] w-full rounded-xl bg-gray-100" />;
};

UserCard.Skeleton = UserCardSkeleton;
