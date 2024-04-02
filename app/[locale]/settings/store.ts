import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UpdateMenteeInfoForm } from "@/types/mentee";
import { UpdateMentorInfoForm } from "@/types/mentor";

interface UserInfoFormState<T extends UpdateMenteeInfoForm | UpdateMentorInfoForm> {
  isModified: boolean;
  userInfoForm?: T | Pick<T, "languages">;
}

interface UserInfoFormAction<T extends UpdateMenteeInfoForm | UpdateMentorInfoForm> {
  setIsModified: (isModified: boolean) => void;
  setUserInfoForm: (userInfoForm: T) => void;
  setLanguages: (languages: T["languages"]) => void;
  clear: () => void;
}

export const useMenteeInfoFormStore = create<
  UserInfoFormState<UpdateMenteeInfoForm> & UserInfoFormAction<UpdateMenteeInfoForm>
>()(
  devtools((set) => ({
    isModified: false,
    setIsModified: (isModified: boolean) => set((state) => ({ ...state, isModified })),
    setUserInfoForm: (userInfoForm) => set((state) => ({ ...state, userInfoForm })),
    setLanguages: (languages) =>
      set((state) => ({ ...state, userInfoForm: { ...state.userInfoForm, languages } })),
    clear: () => set(() => ({ isModified: false, userInfoForm: undefined })),
  }))
);

export const useMentorInfoFormStore = create<
  UserInfoFormState<UpdateMentorInfoForm> & UserInfoFormAction<UpdateMentorInfoForm>
>()(
  devtools((set) => ({
    isModified: false,
    setIsModified: (isModified: boolean) => set((state) => ({ ...state, isModified })),
    setUserInfoForm: (userInfoForm) => set((state) => ({ ...state, userInfoForm })),
    setLanguages: (languages) =>
      set((state) => ({ ...state, userInfoForm: { ...state.userInfoForm, languages } })),
    clear: () => set(() => ({ isModified: false, userInfoForm: undefined })),
  }))
);
