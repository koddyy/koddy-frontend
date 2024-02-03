import { usePathname, useSearchParams } from "next/navigation";
import QueryString from "qs";

export const useQueryString = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (obj: { [key: string]: string }, rewrite: boolean = false) => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    if (rewrite) {
      return `${pathname}?${QueryString.stringify(obj)}`;
    }

    return `${pathname}?${QueryString.stringify({ ...params, ...obj })}`;
  };

  return { pathname, searchParams, createQueryString };
};
