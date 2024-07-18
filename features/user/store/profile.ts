import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MenteeInfoForm } from "../ui/MenteeInfoForm";
import { MentorInfoForm } from "../ui/MentorInfoForm";

interface UserInfoFormState<T extends MenteeInfoForm | MentorInfoForm> {
  isModified: boolean;
  userInfoForm?: T | Pick<T, "languages">;
}

interface UserInfoFormAction<T extends MenteeInfoForm | MentorInfoForm> {
  setIsModified: (isModified: boolean) => void;
  setUserInfoForm: (userInfoForm: T) => void;
  setLanguages: (languages: T["languages"]) => void;
  clear: () => void;
}

export const useMenteeInfoFormStore = create<
  UserInfoFormState<MenteeInfoForm> & UserInfoFormAction<MenteeInfoForm>
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
  UserInfoFormState<MentorInfoForm> & UserInfoFormAction<MentorInfoForm>
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
