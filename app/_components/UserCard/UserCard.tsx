import { Tag } from "@/components/Tag";

type CardType = "horizontal" | "vertical";

interface UserCardProps {
  cardType?: CardType;
  imageUrl?: string;
  name: string;
  description: string;
  nationality?: string;
  languages: string[];
  coffeeChatStatusText?: string;
}

export const UserCard = ({
  cardType = "horizontal",
  imageUrl = "/images/mock_profile.png", // TODO: default image 교체
  coffeeChatStatusText,
  ...props
}: UserCardProps) => {
  if (cardType === "horizontal") return <HorizontalUserCard imageUrl={imageUrl} {...props} />;

  return (
    <VerticalUserCard imageUrl={imageUrl} coffeeChatStatusText={coffeeChatStatusText} {...props} />
  );
};

const HorizontalUserCard = ({ imageUrl, name, description, languages }: UserCardProps) => {
  return (
    <div className="flex justify-between gap-5 rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img className="h-20 w-20 rounded-lg object-cover" src={imageUrl} />
      </div>
      <div className="grow">
        <div className="mb-2 mt-1 border-b border-b-gray-200">
          <span className="body-1-bold mb-[0.13rem]">{name}</span>
          <p className="label-bold text-gray-600">{description}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {languages?.map((language) => <Tag key={language}>{language}</Tag>)}
        </div>
      </div>
    </div>
  );
};

const VerticalUserCard = ({
  imageUrl,
  name,
  description,
  nationality,
  languages,
  coffeeChatStatusText,
}: UserCardProps) => {
  return (
    <>
      <div className="">
        <img className="h-60 w-full object-cover" src={imageUrl} />
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
            {languages.map((language) => (
              <Tag key={language}>{language}</Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
