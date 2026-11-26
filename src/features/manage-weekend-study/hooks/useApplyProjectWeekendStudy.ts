import {
  useApplyProjectWeekendStudyMutation,
  useUpdateProjectWeekendStudyMutation,
} from "@/entities/weekend-study/mutations";
import type { ProjectWeekendStudy } from "@/entities/weekend-study/types";
import type { ProjectMember } from "@/features/manage-night-study/stores/project-form";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useWeekendProjectFormStore } from "../stores/project-form";

const NAME_MAX_LENGTH = 20;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 250;

export const useApplyProjectWeekendStudy = () => {
  const { form, setForm, page, setPage, init, editingId, startEdit } =
    useWeekendProjectFormStore();
  const { mutateAsync: apply, isPending: isApplying } =
    useApplyProjectWeekendStudyMutation();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateProjectWeekendStudyMutation();
  const isPending = isApplying || isUpdating;
  const toast = useToast();

  /** 같은 실에서는 교시를 토글하고, 다른 실을 누르면 그 실로 새로 선택해요. */
  const selectCell = (roomId: number, period: number) => {
    if (form.roomId !== roomId) {
      setForm({ ...form, roomId, periods: [period] });
      return;
    }

    const periods = form.periods.includes(period)
      ? form.periods.filter((p) => p !== period)
      : [...form.periods, period].sort((a, b) => a - b);

    setForm({ ...form, roomId: periods.length ? roomId : null, periods });
  };

  const handleStringChange = (field: "name" | "description", value: string) => {
    setForm({ ...form, [field]: value });
  };

  const isSelected = (memberId: string) =>
    form.members.some((m) => m.publicId === memberId);

  const handleMember = (member: ProjectMember) => {
    setForm({
      ...form,
      members: isSelected(member.publicId)
        ? form.members.filter((m) => m.publicId !== member.publicId)
        : [...form.members, member],
    });
  };

  const handleMembers = (members: ProjectMember[]) => {
    const allSelected =
      members.length > 0 && members.every((m) => isSelected(m.publicId));
    const memberIds = new Set(members.map((m) => m.publicId));

    setForm({
      ...form,
      members: allSelected
        ? form.members.filter((m) => !memberIds.has(m.publicId))
        : [...form.members, ...members.filter((m) => !isSelected(m.publicId))],
    });
  };

  const clearMembers = () => setForm({ ...form, members: [] });

  const validateInfo = () => {
    if (!form.roomId || form.periods.length === 0) {
      return "희망하는 실과 시간을 선택해주세요.";
    }
    const name = form.name.trim();
    if (!name || name.length > NAME_MAX_LENGTH) {
      return `프로젝트명은 ${NAME_MAX_LENGTH}자 이내로 작성해주세요.`;
    }
    const description = form.description.trim();
    if (
      description.length < DESCRIPTION_MIN_LENGTH ||
      description.length > DESCRIPTION_MAX_LENGTH
    ) {
      return `프로젝트 개요는 ${DESCRIPTION_MIN_LENGTH} ~ ${DESCRIPTION_MAX_LENGTH}자로 작성해주세요.`;
    }
    return null;
  };

  const submit = async () => {
    const error = validateInfo();
    if (error) {
      toast.warning(error);
      return;
    }

    if (page === 0) {
      setPage(1);
      return;
    }

    if (form.members.length === 0) {
      toast.warning("팀원을 선택해주세요.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      date: form.date,
      periods: form.periods,
      members: form.members.map((m) => m.publicId),
      roomId: form.roomId!,
    };
    if (editingId) await update({ id: editingId, ...payload });
    else await apply(payload);

    init();
  };

  /**
   * 내 실 대여 신청을 폼으로 불러와 수정해요.
   * 서버가 학생에게 팀원 목록을 내려주지 않아서 팀원은 다시 골라야 해요.
   */
  const editProject = (project: ProjectWeekendStudy) =>
    startEdit(project.id, {
      date: project.date,
      roomId: project.room?.id ?? null,
      periods: project.periods,
      name: project.name,
      description: project.description,
      members: [],
    });

  return {
    form,
    page,
    setPage,
    selectCell,
    handleStringChange,
    selection: { handleMember, handleMembers, isSelected },
    clearMembers,
    submit,
    isPending,
    editingId,
    editProject,
    cancelEdit: init,
  };
};
