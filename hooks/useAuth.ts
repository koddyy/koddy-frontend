import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { Role } from "@/types/user";

export const useAuth = () => {
  const { data: me } = useGetMe();

  const isAuthorized = (roles: Role | Role[]) => {
    if (!me) return false;

    const _roles = Array.isArray(roles) ? roles : [roles];

    return _roles.includes(me.role);
  };

  return {
    me,
    isAuthenticated: Boolean(me),
    isAuthorized,
    role: me?.role,
  };
};
