import { create } from "zustand";
import type { ProjectMember } from "@/features/manage-night-study/stores/project-form";

interface Form {
  roomId: number | null;
  periods: number[];
  name: string;
  description: string;
  members: ProjectMember[];
}

interface State {
  form: Form;
  page: number;
  setForm: (form: Form) => void;
  setPage: (page: number) => void;
  init: () => void;
}

const INITIAL_FORM: Form = {
  roomId: null,
  periods: [],
  name: "",
  description: "",
  members: [],
};

export const useWeekendProjectFormStore = create<State>((set) => ({
  form: INITIAL_FORM,
  page: 0,
  setForm: (form) => set({ form }),
  setPage: (page) => set({ page }),
  init: () => set({ form: INITIAL_FORM, page: 0 }),
}));
