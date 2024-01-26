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
  setSocialId: (id: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useProviderStore = create<ProviderState & ProviderAction>()(
  persist(
    (set) => ({
      loggedIn: false,
      setSocialId: (id) =>
        set((state) => ({
          ...state,
          id,
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
