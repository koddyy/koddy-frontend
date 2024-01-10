import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OauthProvider } from "@/types/oauth";

interface ProviderState {
  selectedProvider?: OauthProvider;
  loggedIn: boolean;
}

interface ProviderAction {
  setSelectedProvider: (selectedProvider: OauthProvider) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useProviderStore = create<ProviderState & ProviderAction>()(
  persist(
    (set) => ({
      loggedIn: false,
      setSelectedProvider: (selectedProvider) =>
        set((state) => ({
          ...state,
          selectedProvider,
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
