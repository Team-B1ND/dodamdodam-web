import type { OutSleepingApplyRequest } from "@/entities/out-sleeping/types";
import { padDate } from "@/shared/utils/pad-date";
import { create } from "zustand";

interface State {
  applyData: OutSleepingApplyRequest;
  setApplyData: (applyData: OutSleepingApplyRequest) => void;
}

const init: OutSleepingApplyRequest = {
  reason: "",
  startAt: padDate(new Date()),
  endAt: padDate(new Date()),
}

export const useApplyOutSleepingStore = create<State>((set) => ({
  applyData: init,
  setApplyData: (applyData) => set({ applyData }),
}))