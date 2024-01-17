import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Day, Period } from "@/types/mentor";

export interface ProfileForm {
  introduction?: string;
  period?: Period;
  schedulesByWeek?: {
    dayOfWeek: Set<Day>;
    start: string;
    end: string;
  };
  schedulesByDay?: Array<{
    dayOfWeek: Day;
    start: string;
    end: string;
  }>;
}

interface ProfileFormAction {
  setProfileData: (data: Partial<ProfileForm>) => void;
}

export const useProfileFormStore = create<ProfileForm & ProfileFormAction>()(
  devtools((set) => ({
    setProfileData: (data) => set((state) => ({ ...state, ...data })),
  }))
);
