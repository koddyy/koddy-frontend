import { CoffeeChatStatusText } from "@/constants/coffeechat";
import { CoffeeChatStatus } from "@/types/coffeechat";

interface CoffeeChatCardProps {
  userType: "mentor" | "mentee";
  coffeechatStatus: CoffeeChatStatus;
  imageUrl?: string;
  userName: string;
  description: string;
}

export const CoffeeChatCard = ({
  userType,
  coffeechatStatus,
  imageUrl = "/images/mock_profile.png",
  userName,
  description,
}: CoffeeChatCardProps) => {
  return (
    <div className="flex items-center justify-between gap-[0.88rem] rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img className="h-20 w-20 rounded-lg object-cover" src={imageUrl} />
      </div>
      <div className="grow">
        <div className="label-bold text-primary-dark">
          {CoffeeChatStatusText[userType][coffeechatStatus]}
        </div>
        <div className="subheading-bold mb-[0.12rem]">{userName}</div>
        <p className="body-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
};
