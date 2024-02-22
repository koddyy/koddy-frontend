import { useTranslations } from "next-intl";
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
  const constants = useTranslations("constants");

  const { profileImageUrl, name, languages, interestSchool, interestMajor, nationality } = user;

  const description = getDescription(
    { role: "mentee", interestSchool, interestMajor },
    constants("profile-description.prefix")
  );

  return (
    <>
      <div className="relative">
        <img
          className={cn(
            "h-[240px] w-full object-cover",
            !profileImageUrl && "object-contain py-[11px]"
          )}
          src={profileImageUrl || DefaultProfileImageUrl["mentee"]}
        />
        <div className="absolute inset-0 z-10 bg-dimmed-gradient" />
      </div>
      <div className="px-[20px] py-[12px]">
        <div className="mb-[14px]">
          {coffeeChatStatusText && (
            <div className="body-2-bold mb-[2px] text-primary-dark">{coffeeChatStatusText}</div>
          )}
          {nationality && (
            <div className="mb-[4px] flex items-center gap-[6px]">
              <img className="h-[18px] w-[18px]" src={NationalityImage[nationality]} />
              {constants(`nationality-options.${nationality}`)}
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
