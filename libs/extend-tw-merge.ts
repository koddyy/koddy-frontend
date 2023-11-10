import { extendTailwindMerge } from "tailwind-merge";

type AdditionalClassGroupIds = "text";
type AdditionalThemeGroupIds = never;

export const customTwMerge = extendTailwindMerge<AdditionalClassGroupIds, AdditionalThemeGroupIds>({
  extend: {
    classGroups: {
      text: [
        { headline: ["1", "2", "3"] },
        { subheading: ["bold", ""] },
        { body: ["1-bold", "1", "2-bold", "2", "3-bold", "3"] },
        { label: ["bold", ""] },
      ],
    },
  },
});
