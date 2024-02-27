import { GetMentorByIdResponse } from "@/apis/user/types";
import { DefaultProfileImageUrl } from "@/constants/profile";
import { cn } from "@/utils/cn";
import { getDescription } from "@/utils/profile";
import { Lanuages } from "./Languages";

type MentorProfileProps = {
  coffeeChatStatusText?: string;
  isAutoCancel?: boolean;
} & GetMentorByIdResponse;

export const MentorProfile = ({
  coffeeChatStatusText,
  isAutoCancel,
  ...user
}: MentorProfileProps) => {
  const { profileImageUrl, name, languages, school, major, enteredIn } = user;

  const description = getDescription({ role: "mentor", school, major, enteredIn });

  return (
    <>
      <div className="relative">
        <img
          className={cn(
            "h-[240px] w-full object-cover",
            !profileImageUrl && "object-contain py-[11px]"
          )}
          src={profileImageUrl || DefaultProfileImageUrl["mentor"]}
        />
        <div className="absolute inset-0 z-10 bg-dimmed-gradient"></div>
      </div>
      <div className="px-[20px] py-[12px]">
        {isAutoCancel && (
          <div className="mb-[12px] rounded-[4px] bg-[#FDEDEE] py-[11px] text-center text-danger">
            시간이 지나 자동으로 취소되었습니다.
          </div>
        )}
        <div className="mb-[14px]">
          {coffeeChatStatusText && (
            <div className="body-2-bold mb-[2px] text-primary-dark">{coffeeChatStatusText}</div>
          )}
          <span className="headline-1">{name}</span>
          <p className="body-1-bold text-gray-500">{description}</p>
        </div>
        <Lanuages mainLanguage={languages.main} subLanguages={languages.sub} />
      </div>
    </>
  );
};
