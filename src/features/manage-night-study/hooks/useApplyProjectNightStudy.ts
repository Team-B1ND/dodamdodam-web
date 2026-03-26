import { useApplyProjectNightStudyMutation } from "@/entities/night-study/mutations";
import { padDate } from "@/shared/utils/pad-date";
import { useToast } from "@b1nd/dodam-design-system/components";
import type { DropdownItem } from "@b1nd/dodam-design-system/components";
import { useProjectFormStore } from "../stores/project-form";
import type { User } from "@/entities/user/types";
import { useState } from "react";

export const useApplyProjectNightStudy = () => {
  const [page, setPage] = useState(0);
  const { form, setForm, init } = useProjectFormStore();
  const { mutateAsync, isPending } = useApplyProjectNightStudyMutation();
  const toast = useToast();

  const handleDateChange = (field: "startAt" | "endAt", value: Date) => {
    setForm({ ...form, [field]: value });
  };

  const handleStringChange = (field: "name" | "description", value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleDropdownChange = (field: "period", value: DropdownItem) => {
    setForm({ ...form, [field]: value });
  };

  const addMember = (member: User) => {
    setForm({ ...form, members: [...form.members, member] });
  };

  const removeMember = (memberId: string) => {
    setForm({
      ...form,
      members: form.members.filter((m) => m.publicId !== memberId),
    });
  };

  const handleMember = (member: User) => {
    if (form.members.find((m) => m.publicId === member.publicId)) {
      removeMember(member.publicId);
    } else {
      addMember(member);
    }
  };

  const isSelected = (memberId: string) => {
    return !!form.members.find((m) => m.publicId === memberId);
  };

  const validate = () => {
    if (!form.name.trim()) return false;
    if (
      form.description.trim().length > 250 ||
      form.description.trim().length < 10
    )
      return false;
    return true;
  };

  const submit = async () => {
    if (!validate()) {
      toast.warning("필수 입력 필드를 모두 채워주세요.");
      return;
    }

    if (!page) {
      setPage(1);
      return;
    }

    if (form.members.length === 0) {
      toast.warning("팀원을 선택해주세요.");
      return;
    }

    await mutateAsync({
      name: form.name,
      description: form.description,
      startAt: padDate(form.startAt),
      endAt: padDate(form.endAt),
      period: Number(form.period.value),
      members: form.members.map((m) => m.publicId),
    });

    init();
  };

  return {
    form,
    handleDateChange,
    handleStringChange,
    handleDropdownChange,
    handleMember,
    submit,
    isPending,
    isSelected,
    page,
    setPage
  };
};
