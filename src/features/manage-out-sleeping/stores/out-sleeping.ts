import type { OutSleepingApplyRequest } from "@/entities/out-sleeping/type";
import { create } from "zustand";

type Page = "apply" | "list";

interface State {
  page: Page;
  setPage: (page: Page) => void;
}


export const useOutSleepingStore = create<State>((set) => ({
  page: "apply",
  setPage: (page) => set({ page }),
}))