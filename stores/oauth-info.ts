import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { OauthLoginNotFoundErrorResponse } from "@/apis/auth/type";

export type OauthInfo = Pick<OauthLoginNotFoundErrorResponse, "name" | "email">;

interface OauthInfoStore {
  oauthInfo?: OauthInfo;
  setOauthInfo: (oauthInfo: OauthInfo) => void;
}

export const useOauthInfoStore = create<OauthInfoStore>()(
  devtools((set) => ({
    setOauthInfo: (oauthInfo) => set(() => ({ oauthInfo })),
  }))
);
