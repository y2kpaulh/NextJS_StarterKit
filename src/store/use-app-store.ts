import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HarnessMode = "normal" | "loading" | "empty" | "error";

export interface AppState {
  sidebarOpen: boolean;
  counter: number;
  defaultHarnessState: HarnessMode;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  increment: () => void;
  decrement: () => void;
  resetCounter: () => void;
  setDefaultHarnessState: (mode: HarnessMode) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      counter: 0,
      defaultHarnessState: "normal",
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
      resetCounter: () => set({ counter: 0 }),
      setDefaultHarnessState: (mode) => set({ defaultHarnessState: mode }),
    }),
    {
      name: "starter-kit-app-storage",
    },
  ),
);
