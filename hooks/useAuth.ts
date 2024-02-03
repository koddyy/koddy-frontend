import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { Role } from "@/types/user";

export const useAuth = () => {
  const { data: me, ...rest } = useGetMe();

  const isAuthorized = (roles: Role | Role[]) => {
    if (!me) return false;

    const _roles = Array.isArray(roles) ? roles : [roles];

    return _roles.includes(me.role);
  };

  if (!me) {
    return {
      me: undefined,
      isAuthenticated: false as const,
      isAuthorized,
      ...rest,
    };
  }

  return {
    me,
    isAuthenticated: true as const,
    isAuthorized,
    ...rest,
  };
};
