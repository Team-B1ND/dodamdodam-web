import type { DropdownItem } from "@b1nd/dodam-design-system/components";
import { create } from "zustand";
import { PERIOD_OPTIONS } from "../constants/period-options";
import type { StudentInfo } from "@/entities/user/types";

export interface ProjectMember {
  publicId: string;
  name: string;
  profileImage?: string;
  student?: Pick<StudentInfo, "grade" | "room">;
}

interface Form {
  period: DropdownItem;
  wishRoom: DropdownItem | null;
  date: Date;
  name: string;
  description: string;
  members: ProjectMember[];
}

interface State {
  form: Form;
  setForm: (form: Form) => void;
  init: () => void;
}

const INITIAL_FORM = {
  period: PERIOD_OPTIONS[0],
  wishRoom: null,
  date: new Date(),
  name: "",
  description: "",
  members: [],
};

export const useProjectFormStore = create<State>((set) => ({
  form: INITIAL_FORM,
  setForm: (form) => set({ form }),
  init: () => set({ form: INITIAL_FORM }),
}));
