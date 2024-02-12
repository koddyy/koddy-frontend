import { useTranslations } from "next-intl";
import { DefaultProfileImageUrl } from "@/constants/profile";
import { CoffeeChatStatus } from "@/types/coffeechat";
import { cn } from "@/utils/cn";
import { getDescription } from "@/utils/profile";
import { UserCardProps } from "../../../components/UserCard";

type CoffeeChatCardProps = UserCardProps & {
  status: CoffeeChatStatus;
};

export const CoffeeChatCard = ({ status, ...user }: CoffeeChatCardProps) => {
  const constants = useTranslations("constants");

  const description = getDescription(user);
  const { profileImageUrl, name } = user;

  return (
    <div className="flex items-center justify-between gap-[0.88rem] rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img
          className={cn(
            "h-20 w-20 rounded-lg object-cover",
            !profileImageUrl && "border border-gray-300 object-contain p-[0.3rem]"
          )}
          src={profileImageUrl || DefaultProfileImageUrl[user.role]}
        />
      </div>
      <div className="grow">
        <div className="label-bold text-primary-dark">
          {constants(
            `coffeechat-status-text.${user.role === "mentor" ? "mentee" : "mentor"}.${status}`
          )}
        </div>
        <div className="subheading-bold mb-[0.12rem]">{name}</div>
        <p className="body-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
};
