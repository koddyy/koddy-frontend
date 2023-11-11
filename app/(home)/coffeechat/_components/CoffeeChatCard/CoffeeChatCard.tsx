import { CoffeeChatStatusText } from "@/constants/coffeechat";
import { CoffeeChatStatus } from "@/types/coffeechat";

interface CoffeeChatCardProps {
  userType: "mentor" | "mentee";
  status: CoffeeChatStatus;
  imageUrl?: string;
  name: string;
  introduce?: string;
}

export const CoffeeChatCard = ({
  userType,
  status,
  imageUrl = "/images/mock_profile.png",
  name,
  introduce,
}: CoffeeChatCardProps) => {
  return (
    <div className="flex items-center justify-between gap-[0.88rem] rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img className="h-20 w-20 rounded-lg object-cover" src={imageUrl} />
      </div>
      <div className="grow">
        <div className="label-bold text-primary-dark">{CoffeeChatStatusText[userType][status]}</div>
        <div className="subheading-bold mb-[0.12rem]">{name}</div>
        <p className="body-2 text-gray-600">{introduce}</p>
      </div>
    </div>
  );
};
