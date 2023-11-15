import { ElementType } from "react";
import Mentee from "@/assets/mentee.svg";
import Mentor from "@/assets/mentor.svg";
import { cn } from "@/utils/cn";

export type UserType = "mentor" | "mentee";

export interface UserTypeCardProps {
  type: UserType;
  onClick: () => void;
  isSelected?: boolean;
}

type ContentType = {
  image: ElementType;
  typeName: string;
  description: string[];
};

const contents: {
  [key in UserType]: ContentType;
} = {
  mentor: {
    image: Mentor,
    typeName: "멘토",
    description: ["한국에 적응하고 싶은 유학생들을 위해", "코띠의 멘토가 되어주세요!"],
  },
  mentee: {
    image: Mentee,
    typeName: "멘티",
    description: ["한국 생활을 알고 싶다면", "코띠 멘토의 도움을 받아보세요!"],
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
        <content.image />
      </div>
      <div className="text-center">
        <span className="subheading-bold">{content.typeName}</span>
        <p className="body-3 whitespace-pre-line text-gray-600">{content.description.join("\n")}</p>
      </div>
    </div>
  );
};
