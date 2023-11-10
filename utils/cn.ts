import { type ClassValue, clsx } from "clsx";
import { customTwMerge } from "@/libs/extend-tw-merge";

export const cn = (...args: ClassValue[]) => {
  return customTwMerge(clsx(args));
};
