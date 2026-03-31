import type { DropdownItem } from "@b1nd/dodam-design-system/components";
import { create } from "zustand";
import { PERIOD_OPTIONS } from "../constants/period-options";
import type { User } from "@/entities/user/types";

interface Form {
  period: DropdownItem;
  startAt: Date;
  endAt: Date;
  name: string;
  description: string;
  members: User[];
}

interface State {
  form: Form;
  setForm: (form: Form) => void;
  init: () => void;
}

const INITIAL_FORM = {
  period: PERIOD_OPTIONS[0],
  startAt: new Date(),
  endAt: new Date(),
  name: "",
  description: "",
  members: [],
};

export const useProjectFormStore = create<State>((set) => ({
  form: INITIAL_FORM,
  setForm: (form) => set({ form }),
  init: () => set({ form: INITIAL_FORM }),
}));
