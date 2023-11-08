import { Tag } from "@/components/Tag";

interface UserCardProps {
  imageUrl?: string;
  name: string;
  description: string;
  nationality?: string;
  languages: string[];
}

export const UserCard = ({
  imageUrl = "/images/mock_profile.png", // TODO: default image 교체
  name,
  description,
  languages,
}: UserCardProps) => {
  return (
    <div className="flex justify-between gap-5 rounded-xl bg-gray-100 p-3">
      <div className="shrink-0 rounded-lg">
        <img className="h-20 w-20 rounded-lg object-cover" src={imageUrl} />
      </div>
      <div className="grow">
        <div className="mb-2 mt-1 border-b border-b-gray-200">
          <span className="body-1-bold">{name}</span>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {languages.map((language) => (
            <Tag key={language}>{language}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
