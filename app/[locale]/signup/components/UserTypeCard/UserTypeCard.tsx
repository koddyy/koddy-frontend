import { useTranslations } from "next-intl";
import Mentee from "@/assets/mentee.svg";
import Mentor from "@/assets/mentor.svg";
import { cn } from "@/utils/cn";

export type UserType = "mentor" | "mentee";

export interface UserTypeCardProps {
  type: UserType;
  onClick: () => void;
  isSelected?: boolean;
}

const image = {
  mentor: Mentor,
  mentee: Mentee,
};

export const UserTypeCard = ({ type, onClick, isSelected = false }: UserTypeCardProps) => {
  const t = useTranslations("signup.UserTypeCard");

  const Image = image[type];

  return (
    <div
      className={cn("rounded-2xl border-2 border-gray-300 py-4", isSelected && "border-primary")}
      onClick={onClick}
    >
      <div className="mb-[0.375rem] flex items-center justify-center">
        <Image alt={t(`${type}.illustration-alt-text`)} />
      </div>
      <div className="text-center">
        <span className="subheading-bold">{t(`${type}.role-name`)}</span>
        <p className="body-3 whitespace-pre-line text-gray-600">
          {t.rich(`${type}.description`, {
            br: () => <br />,
          })}
        </p>
      </div>
    </div>
  );
};
