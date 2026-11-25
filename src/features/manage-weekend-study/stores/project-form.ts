import { create } from "zustand";
import { getWeekendStudyDate } from "@/entities/weekend-study/constants";
import type { ProjectMember } from "@/features/manage-night-study/stores/project-form";

interface Form {
  /** `YYYY-MM-DD` */
  date: string;
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

const createInitialForm = (): Form => ({
  date: getWeekendStudyDate().format("YYYY-MM-DD"),
  roomId: null,
  periods: [],
  name: "",
  description: "",
  members: [],
});

export const useWeekendProjectFormStore = create<State>((set) => ({
  form: createInitialForm(),
  page: 0,
  setForm: (form) => set({ form }),
  setPage: (page) => set({ page }),
  init: () => set({ form: createInitialForm(), page: 0 }),
}));
