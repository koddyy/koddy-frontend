import { Tag } from "@/components/Tag";
import { languageCodeText } from "@/constants/language";
import type { Mentee, Mentor } from "@/types/user";
import { cn } from "@/utils/cn";

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
    user.mentorYn === "Y" ? "/images/empty_mentor.svg" : "/images/empty_mentee.svg";

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
  const { mentorYn, name, school, major } = user;
  const description =
    mentorYn === "Y" ? `${school} ${major} ${user.grade}학년` : `관심 : ${school}, ${major}`;

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
  const { mentorYn, name, school, major, nationality, languages } = user;
  const description =
    mentorYn === "Y" ? `${school} ${major} ${user.grade}학년` : `관심 : ${school}, ${major}`;

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
        <div className="mb-2">
          {coffeeChatStatusText && (
            <div className="body-2-bold text-primary-dark">{coffeeChatStatusText}</div>
          )}
          <span className="headline-2">{name}</span>
          <p className="body-3-bold">{description}</p>
        </div>
        <div className="flex justify-between">
          <Tag variant="primary-dark">{nationality}</Tag>
          <div className="flex flex-wrap justify-end gap-2">
            {languages.map(({ languageId }) => (
              <Tag key={languageId}>{languageCodeText[languageId]}</Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
