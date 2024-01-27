import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { isNil } from "@/utils/typeUtils";

type TypedURLSearchParams<T extends Record<string, unknown>> = Omit<
  ReadonlyURLSearchParams,
  "append" | "delete" | "forEach" | "get" | "getAll" | "has" | "set"
> & {
  append: <K extends keyof T>(key: K, value: T[K]) => void;
  delete: <K extends keyof T>(name: K, value?: T[K]) => void;
  forEach: (
    callback: (value: string, key: keyof T, parent: TypedURLSearchParams<T>) => void,
    thisArg?: unknown
  ) => void;
  get: <K extends keyof T>(name: K) => T[K] | null;
  getAll: <K extends keyof T>(name: K) => T[K];
  has: <K extends keyof T>(name: K, value?: T[K]) => boolean;
  set: <K extends keyof T>(name: K, value: T[K]) => void;
};

export const useTypedSearchParams = <T>() => {
  const searchParams = useSearchParams() as unknown as TypedURLSearchParams<Partial<T>>;
  const pathname = usePathname();
  const router = useRouter();

  const urlSearchParams = new URLSearchParams(searchParams.toString());

  const setSearchParams = (params: Partial<T>) => {
    Object.entries(params).forEach(([key, value]) => {
      if (isNil(value)) {
        urlSearchParams.delete(key);
      } else if (Array.isArray(value)) {
        urlSearchParams.delete(key);
        value.forEach((v) => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    router.replace(`${pathname}?${urlSearchParams.toString()}`);
  };

  return { searchParams, setSearchParams };
};
