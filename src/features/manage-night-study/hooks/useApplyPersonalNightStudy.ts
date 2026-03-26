import { useApplyPersonalNightStudyMutation } from "@/entities/night-study/mutations";
import { padDate } from "@/shared/utils/pad-date";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

interface Form {
  startAt: Date;
  endAt: Date;
  period: string;
  needPhone: boolean;
  needPhoneReason: string;
  description: string;
}

const INITIAL_FORM: Form = {
  startAt: new Date(),
  endAt: new Date(),
  period: "1",
  needPhone: false,
  needPhoneReason: "",
  description: "",
};

export const useApplyPersonalNightStudy = () => {
  const [form, setForm] = useState<Form>(INITIAL_FORM);
  const { mutateAsync, isPending } = useApplyPersonalNightStudyMutation();
  const toast = useToast();

  const handleDateChange = (field: "startAt" | "endAt", value: Date) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStringChange = (
    field: "period" | "needPhoneReason" | "description",
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = (field: "needPhone", value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (form.needPhone && !form.needPhoneReason.trim()) return false;
    if (form.description.trim().length > 250 || form.description.trim().length < 10)
      return false;
    return true;
  };

  const init = () => {
    setForm(INITIAL_FORM);
  };

  const submit = async () => {
    if (!validate()) {
      toast.warning("필수 입력 필드를 모두 채워주세요.");
      return;
    }

    await mutateAsync({
      description: form.description,
      startAt: padDate(form.startAt),
      endAt: padDate(form.endAt),
      period: Number(form.period),
      needPhone: form.needPhone,
      needPhoneReason: form.needPhone ? form.needPhoneReason : null,
    });

    init();
  };

  return {
    form,
    handleDateChange,
    handleStringChange,
    handleBooleanChange,
    submit,
    isPending,
  };
};
