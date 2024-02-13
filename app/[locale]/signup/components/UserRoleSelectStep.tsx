import { useTranslations } from "next-intl";
import { Role } from "@/types/user";
import { UserTypeCard } from "./UserTypeCard";

interface UserRoleSelectStepProps {
  selectedUserRole?: Role;
  onChangeUserRole: (role: Role) => void;
}

export const UserRoleSelectStep = ({
  selectedUserRole,
  onChangeUserRole,
}: UserRoleSelectStepProps) => {
  const t = useTranslations("signup.UserRoleSelectStep");

  return (
    <>
      <h2 className="headline-3 my-5 text-center">{t("title")}</h2>
      <div className="flex flex-col gap-[1.75rem] px-8">
        <UserTypeCard
          type="mentor"
          onClick={() => onChangeUserRole("mentor")}
          isSelected={selectedUserRole === "mentor"}
        />
        <UserTypeCard
          type="mentee"
          onClick={() => onChangeUserRole("mentee")}
          isSelected={selectedUserRole === "mentee"}
        />
      </div>
    </>
  );
};
