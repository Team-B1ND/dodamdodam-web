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
    const errorMessage = [];
    if (form.needPhone && !form.needPhoneReason.trim()) {
      errorMessage.push("필수 입력 필드를 채워주세요.");
    };
    if (form.startAt.getTime() > form.endAt.getTime()) {
      errorMessage.push("시작 날짜가 종료 날짜 이전일 수 없습니다.");
    } else if (Math.abs(form.endAt.getTime() - form.startAt.getTime()) > 7*24*60*60*1000) {
      errorMessage.push("일주일 이상은 신청 불가능합니다.")
    };
    if (form.description.trim().length >= 250 || form.description.trim().length <= 10) {
      errorMessage.push("10글자 이상, 250자 이하로 작성해주세요.");
    }
    return errorMessage;
  };

  const init = () => {
    setForm(INITIAL_FORM);
  };

  const submit = async () => {
    if (validate().length !== 0) {
      toast.warning(validate().join(" 또한 "));
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
