import { CoffeeChatStatusText } from "@/constants/coffeechat";
import { CoffeeChatStatus } from "@/types/coffeechat";
import { Role } from "@/types/user";
import { cn } from "@/utils/cn";

interface CoffeeChatCardProps {
  userRole: Role;
  status: CoffeeChatStatus;
  imageUrl?: string;
  name: string;
  introduce?: string;
}

export const CoffeeChatCard = ({
  userRole,
  status,
  imageUrl,
  name,
  introduce,
}: CoffeeChatCardProps) => {
  const defaultImageUrl =
    userRole === "mentor" ? "/images/empty_mentee.svg" : "/images/empty_mentor.svg";

  return (
    <div className="flex items-center justify-between gap-[0.88rem] rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img
          className={cn(
            "h-20 w-20 rounded-lg object-cover",
            !imageUrl && "border border-gray-300 object-contain p-[0.3rem]"
          )}
          src={imageUrl || defaultImageUrl}
        />
      </div>
      <div className="grow">
        <div className="label-bold text-primary-dark">{CoffeeChatStatusText[userRole][status]}</div>
        <div className="subheading-bold mb-[0.12rem]">{name}</div>
        <p className="body-2 text-gray-600">{introduce}</p>
      </div>
    </div>
  );
};
