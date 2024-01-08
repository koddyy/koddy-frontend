import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  accessToken?: string;
  setAccessToken: (accessToken: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    setAccessToken: (accessToken) =>
      set(() => ({
        accessToken,
      })),
    clear: () => set(() => ({ accessToken: undefined })),
  }))
);
