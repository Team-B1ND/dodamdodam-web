import type { OutSleepingApplyRequest } from "@/entities/out-sleeping/type";
import { padDate } from "@/shared/utils/pad-date";
import { create } from "zustand";

type Page = "apply" | "list";

interface State {
  page: Page;
  setPage: (page: Page) => void;
  applyData: OutSleepingApplyRequest;
  setApplyData: (applyData: OutSleepingApplyRequest) => void;
}

const init: OutSleepingApplyRequest = {
  reason: "",
  startAt: padDate(new Date()),
  endAt: padDate(new Date()),
}

export const useOutSleepingStore = create<State>((set) => ({
  page: "apply",
  setPage: (page) => set({ page }),
  applyData: init,
  setApplyData: (applyData) => set({ applyData }),
}))