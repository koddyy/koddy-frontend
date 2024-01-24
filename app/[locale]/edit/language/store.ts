import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";

interface LanguageState {
  languages?: Mentor["languages"] | Mentee["languages"];
  setLanguages: (languages: Mentor["languages"] | Mentee["languages"]) => void;
  clear: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  devtools((set) => ({
    setLanguages: (languages) =>
      set(() => ({
        languages,
      })),
    clear: () => set(() => ({ languages: undefined })),
  }))
);
