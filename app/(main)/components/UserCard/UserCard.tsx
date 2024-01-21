import { cva } from "cva";
import { Tag } from "@/components/Tag";
import { LanguageCode, NationAndLanguageCodeMapping, NationCodeText } from "@/constants/language";
import { NationalityImage } from "@/constants/nationality";
import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";
import { cn } from "@/utils/cn";
import { capitalize } from "@/utils/string";

export const LanguageTextColorVariants = cva("", {
  variants: {
    language: {
      KO: "text-[#FF3FE0]",
      EN: "text-[#2C79EC]",
      CN: "text-[#F53A3A]",
      JA: "text-[#24CE49]",
      VI: "text-[#F6752D]",
    } as Record<LanguageCode, string>,
  },
});

type CardType = "horizontal" | "vertical";

type UserCardProps = {
  cardType?: CardType;
  imageUrl?: string;
  defaultImageUrl?: string;
  coffeeChatStatusText?: string;
} & (Mentor | Mentee);

export const UserCard = ({
  cardType = "horizontal",
  coffeeChatStatusText,
  ...user
}: UserCardProps) => {
  const defaultImageUrl =
    user.role === "mentor" ? "/images/empty_mentor.svg" : "/images/empty_mentee.svg";

  if (cardType === "horizontal")
    return <HorizontalUserCard defaultImageUrl={defaultImageUrl} {...user} />;

  return (
    <VerticalUserCard
      defaultImageUrl={defaultImageUrl}
      coffeeChatStatusText={coffeeChatStatusText}
      {...user}
    />
  );
};

const HorizontalUserCard = ({ imageUrl, defaultImageUrl, ...user }: UserCardProps) => {
  const { role, name } = user;
  const description =
    role === "mentor"
      ? `${user.school} ${user.major} ${user.enteredIn}학년`
      : `관심 : ${user.interestSchool}, ${user.interestMajor}`;

  return (
    <div className="flex justify-between gap-[1.13rem] rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img
          className={cn(
            "h-20 w-20 rounded-lg object-cover",
            !imageUrl && "border border-gray-300 object-contain p-[0.3rem]"
          )}
          src={imageUrl || defaultImageUrl}
        />
      </div>
      <div className="flex grow flex-col justify-center">
        <div className="subheading-bold mb-[0.13rem]">{name}</div>
        <p className="body-2 line-clamp-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const HorizontalUserCardSkeleton = () => {
  return <div className="h-[6.5rem] w-full rounded-xl bg-gray-100" />;
};

UserCard.HorizontalSkeleton = HorizontalUserCardSkeleton;

const VerticalUserCard = ({
  imageUrl,
  defaultImageUrl,
  coffeeChatStatusText,
  ...user
}: UserCardProps) => {
  const { role, name, languages } = user;
  const description =
    role === "mentor"
      ? `${user.school} ${user.major} ${user.enteredIn}학년`
      : `관심 : ${user.interestSchool}, ${user.interestMajor}`;

  const mainLanguageCode = NationAndLanguageCodeMapping[languages.main];

  return (
    <>
      <div className="relative">
        <img
          className={cn("h-60 w-full object-cover", !imageUrl && "object-contain py-[0.69rem]")}
          src={imageUrl || defaultImageUrl}
        />
        <div className="absolute inset-0 z-10 bg-dimmed-gradient"></div>
      </div>
      <div className="px-5 py-3">
        <div className="mb-[14px]">
          {coffeeChatStatusText && (
            <div className="body-2-bold text-primary-dark">{coffeeChatStatusText}</div>
          )}
          {role === "mentee" && (
            <div className="mb-[4px] flex items-center gap-[6px]">
              <img className="h-[18px] w-[18px]" src={NationalityImage[user.nationality]} />
              {user.nationality}
            </div>
          )}
          <span className="headline-1">{name}</span>
          <p className="body-1-bold text-gray-500">{description}</p>
        </div>
        <div className="flex gap-[16px]">
          <div>
            <div className="label mb-[4px]">메인 언어</div>
            <Tag variant="solid" color="grayscale">
              <span
                className={cn(
                  "body-3-bold mr-[4px]",
                  LanguageTextColorVariants({ language: mainLanguageCode })
                )}
              >
                {capitalize(mainLanguageCode)}
              </span>
              {NationCodeText[languages.main]}
            </Tag>
          </div>
          <div className="grow">
            <div className="label mb-[4px]">서브 언어</div>
            <div className="flex flex-wrap gap-[6px]">
              {languages.sub.map((language) => {
                const subLanguageCode = NationAndLanguageCodeMapping[language];

                return (
                  <Tag key={language} variant="outline" color="grayscale">
                    <span
                      className={cn(
                        "body-3-bold mr-[4px]",
                        LanguageTextColorVariants({ language: subLanguageCode })
                      )}
                    >
                      {capitalize(subLanguageCode)}
                    </span>
                    {NationCodeText[language]}
                  </Tag>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
