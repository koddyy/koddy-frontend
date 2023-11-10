import { CoffeeChatStatus } from "@/types/coffeechat";

type UserType = "mentor" | "mentee";

type CoffeeChatStatusTextType = { [key in CoffeeChatStatus]: string };

const CoffeeChatStatusText: {
  [key in UserType]: CoffeeChatStatusTextType;
} = {
  mentor: {
    expected: "커피챗 예정이에요",
    requested: "멘티에게 커피챗 제안을 했어요",
    recieved: "멘티에게 커피챗 신청이 왔어요",
    completed: "커피챗을 완료했어요",
    canceled: "커피챗이 취소됐어요",
  },
  mentee: {
    expected: "커피챗 예정이에요",
    requested: "멘토에게 커피챗 신청을 했어요",
    recieved: "멘토에게 커피챗 제안이 왔어요",
    completed: "커피챗을 완료했어요",
    canceled: "커피챗이 취소됐어요",
  },
};

interface CoffeeChatCardProps {
  userType: UserType;
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
