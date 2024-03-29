import { useTranslations } from "next-intl";
import { DefaultProfileImageUrl } from "@/constants/profile";
import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";
import { cn } from "@/utils/cn";
import { getDescription } from "@/utils/profile";

export type UserCardProps =
  | (Pick<Mentor, "name" | "profileImageUrl" | "school" | "major" | "enteredIn"> & {
      role: "mentor";
    })
  | (Pick<Mentee, "name" | "profileImageUrl" | "interestSchool" | "interestMajor"> & {
      role: "mentee";
    });

export const UserCard = ({ ...user }: UserCardProps) => {
  const constants = useTranslations("constants");

  const description = getDescription(user, constants("profile-description.prefix"));
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
