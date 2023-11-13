import { Tag } from "@/components/Tag";
import { languageTypeText } from "@/constants/language";
import type { User } from "@/types/user";
import { cn } from "@/utils/cn";

type CardType = "horizontal" | "vertical";

interface UserCardProps extends User {
  cardType?: CardType;
  imageUrl?: string;
  coffeeChatStatusText?: string;
}

export const UserCard = ({
  cardType = "horizontal",
  imageUrl = "/images/empty_profile.svg",
  coffeeChatStatusText,
  ...props
}: UserCardProps) => {
  if (cardType === "horizontal") return <HorizontalUserCard imageUrl={imageUrl} {...props} />;

  return (
    <VerticalUserCard imageUrl={imageUrl} coffeeChatStatusText={coffeeChatStatusText} {...props} />
  );
};

const HorizontalUserCard = ({ imageUrl, name, school, major, grade, mentorYn }: UserCardProps) => {
  const description =
    mentorYn === "Y" ? `${school} ${major} ${grade}학년` : `관심 : ${school}, ${major}`;

  return (
    <div className="flex justify-between gap-[1.13rem] rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img
          className={cn(
            "h-20 w-20 rounded-lg object-cover",
            imageUrl && "border border-gray-300 object-contain p-[0.49rem]"
          )}
          src={imageUrl}
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
  name,
  school,
  major,
  grade,
  mentorYn,
  nationality,
  languages,
  coffeeChatStatusText,
}: UserCardProps) => {
  const description =
    mentorYn === "Y" ? `${school} ${major} ${grade}학년` : `관심 : ${school}, ${major}`;

  return (
    <>
      <div className="relative">
        <img className="h-60 w-full object-cover" src={imageUrl} />
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
              <Tag key={languageId}>{languageTypeText[languageId]}</Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
