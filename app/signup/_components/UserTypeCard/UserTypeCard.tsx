import { cn } from "@/utils/cn";

export type UserType = "mentor" | "mentee";

export interface UserTypeCardProps {
  type: UserType;
  onClick: () => void;
  isSelected?: boolean;
}

type ContentType = {
  imageUrl: string;
  typeName: string;
  description: string[];
};

const contents: {
  [key in UserType]: ContentType;
} = {
  mentor: {
    imageUrl: "images/mentor.png",
    typeName: "멘토",
    description: ["멘티에게 도움을 줄 수 있는", "한국인이라면 모두 환영합니다"],
  },
  mentee: {
    imageUrl: "/images/mentee.png",
    typeName: "멘티",
    description: ["멘토에게 도움을 받을", "예비 유학생과 유학생 모두 환영합니다"],
  },
};

export const UserTypeCard = ({ type, onClick, isSelected = false }: UserTypeCardProps) => {
  const content = contents[type];

  return (
    <div
      className={cn("rounded-2xl border-2 border-gray-300 py-4", isSelected && "border-primary")}
      onClick={onClick}
    >
      <div className="mb-[0.375rem] flex items-center justify-center">
        <img src={content.imageUrl} />
      </div>
      <div className="text-center">
        <span className="subheading-bold">{content.typeName}</span>
        <p className="body-3 whitespace-pre-line text-gray-500">{content.description.join("\n")}</p>
      </div>
    </div>
  );
};
