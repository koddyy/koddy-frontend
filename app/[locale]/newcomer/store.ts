import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Mentor } from "@/types/mentor";

export type CompleteProfileForm = Pick<Mentor, "introduction" | "period" | "schedules"> & {
  profileImageFile?: File;
};

interface CompleteProfileFormAction {
  setProfileForm: (profileFormData: Partial<CompleteProfileForm>) => void;
  setIntroduction: (introduction: Mentor["introduction"]) => void;
  setPeriod: (period: Mentor["period"]) => void;
  setSchedules: (schedules: Mentor["schedules"]) => void;
  setProfileImageFile: (profileImage: File) => void;
}

export const useCompleteProfileFormStore = create<
  CompleteProfileForm & CompleteProfileFormAction
>()(
  devtools((set) => ({
    setProfileForm: (profileFormData) => set((state) => ({ ...state, ...profileFormData })),
    setIntroduction: (introduction) => set((state) => ({ ...state, introduction })),
    setPeriod: (period) => set((state) => ({ ...state, period })),
    setSchedules: (schedules) => set((state) => ({ ...state, schedules })),
    setProfileImageFile: (profileImageFile) => set((state) => ({ ...state, profileImageFile })),
  }))
);
