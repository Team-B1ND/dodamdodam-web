import { create } from "zustand";
import { getWeekendStudyDate } from "@/entities/weekend-study/constants";
import type { ProjectMember } from "@/features/manage-night-study/stores/project-form";

interface Form {
  /** `YYYY-MM-DD`. 새 신청은 항상 이번 주 일요일이고, 수정할 때만 원래 신청 날짜를 써요. */
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
  /** 수정 중인 실 대여 신청 id예요. 새로 신청할 때는 `null`이에요. */
  editingId: string | null;
  setForm: (form: Form) => void;
  setPage: (page: number) => void;
  startEdit: (id: string, form: Form) => void;
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
  editingId: null,
  setForm: (form) => set({ form }),
  setPage: (page) => set({ page }),
  startEdit: (editingId, form) => set({ editingId, form, page: 0 }),
  init: () => set({ form: createInitialForm(), page: 0, editingId: null }),
}));
