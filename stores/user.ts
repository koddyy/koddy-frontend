import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/types/user";

interface UserState {
  user?: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    setUser: (user) => set(() => ({ user })),
  }))
);
