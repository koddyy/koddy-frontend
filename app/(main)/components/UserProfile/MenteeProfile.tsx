import { GetMenteeByIdResponse } from "@/apis/user/types";
import { NationalityImage } from "@/constants/nationality";
import { DefaultProfileImageUrl } from "@/constants/profile";
import { cn } from "@/utils/cn";
import { getDescription } from "@/utils/profile";
import { Lanuages } from "./Languages";

type MenteeProfileProps = {
  coffeeChatStatusText?: string;
} & GetMenteeByIdResponse;

export const MenteeProfile = ({ coffeeChatStatusText, ...user }: MenteeProfileProps) => {
  const { profileImageUrl, name, languages, interestSchool, interestMajor, nationality } = user;

  const description = getDescription({ role: "mentee", interestSchool, interestMajor });

  return (
    <>
      <div className="relative">
        <img
          className={cn(
            "h-60 w-full object-cover",
            !profileImageUrl && "object-contain py-[0.69rem]"
          )}
          src={profileImageUrl || DefaultProfileImageUrl["mentee"]}
        />
        <div className="absolute inset-0 z-10 bg-dimmed-gradient"></div>
      </div>
      <div className="px-5 py-3">
        <div className="mb-[14px]">
          {coffeeChatStatusText && (
            <div className="body-2-bold text-primary-dark">{coffeeChatStatusText}</div>
          )}
          {nationality && (
            <div className="mb-[4px] flex items-center gap-[6px]">
              <img className="h-[18px] w-[18px]" src={NationalityImage[nationality]} />
              {nationality}
            </div>
          )}
          <span className="headline-1">{name}</span>
          <p className="body-1-bold text-gray-500">{description}</p>
        </div>
        <Lanuages mainLanguage={languages.main} subLanguages={languages.sub} />
      </div>
    </>
  );
};
