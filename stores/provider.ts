import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OauthProvider } from "@/types/oauth";

interface ProviderState {
  selectedProvider?: OauthProvider;
  loggedIn: boolean;
}

interface ProviderAction {
  setSelectedProvider: (provider: OauthProvider) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useProviderStore = create<ProviderState & ProviderAction>()(
  persist(
    (set) => ({
      loggedIn: false,
      setSelectedProvider: (provider) =>
        set((state) => ({
          ...state,
          selectedProvider: provider,
        })),
      setLoggedIn: (loggedIn) =>
        set((state) => ({
          ...state,
          loggedIn,
        })),
      setProviderState: ({ selectedProvider, loggedIn }: ProviderState) =>
        set(() => ({
          selectedProvider,
          loggedIn,
        })),
    }),

    {
      name: "provider",
    }
  )
);
