import { create } from "zustand";

type Page = "apply" | "list";

interface State {
  page: Page;
  setPage: (page: Page) => void;
}

export const useOutSleepingPageStore = create<State>((set) => ({
  page: "apply",
  setPage: (page) => set({ page }),
}))