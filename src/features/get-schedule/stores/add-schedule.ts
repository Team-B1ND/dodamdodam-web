import { SCHEDULE_TARGET_ITEMS } from "@/features/get-schedule/constants/schedule-target";
import type { DropdownItem } from "@b1nd/dodam-design-system/components";
import { create } from "zustand";

interface AddScheduleForm {
  title: string;
  startAt?: string;
  endAt?: string;
  target: DropdownItem;
}

interface State {
  addScheduleData: AddScheduleForm;
  setAddScheduleData: (addScheduleData: AddScheduleForm) => void;
}

const init: AddScheduleForm = {
  title: "",
  target: SCHEDULE_TARGET_ITEMS[0],
};

export const useAddScheduleStore = create<State>((set) => ({
  addScheduleData: init,
  setAddScheduleData: (addScheduleData) => set({ addScheduleData }),
}));
