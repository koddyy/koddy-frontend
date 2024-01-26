import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OauthProvider } from "@/types/oauth";

export interface ProviderState {
  provider?: OauthProvider;
  socialId?: string;
  loggedIn: boolean;
}

interface ProviderAction {
  setProvider: (selectedProvider: OauthProvider) => void;
  setSocialId: (socialId: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useProviderStore = create<ProviderState & ProviderAction>()(
  persist(
    (set) => ({
      loggedIn: false,
      setSocialId: (socialId) =>
        set((state) => ({
          ...state,
          socialId,
        })),
      setProvider: (provider) =>
        set((state) => ({
          ...state,
          provider,
        })),
      setLoggedIn: (loggedIn) =>
        set((state) => ({
          ...state,
          loggedIn,
        })),
    }),
    {
      skipHydration: true,
      name: "provider",
    }
  )
);
