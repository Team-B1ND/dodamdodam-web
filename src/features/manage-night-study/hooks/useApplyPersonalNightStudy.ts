import { useApplyPersonalNightStudyMutation } from "@/entities/night-study/mutations";
import { padDate } from "@/shared/utils/pad-date";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

export const useApplyPersonalNightStudy = () => {
  const [startAt, setStartAt] = useState(new Date());
  const [endAt, setEndAt] = useState(new Date());
  const [period, setPeriod] = useState("1");
  const [needPhone, setNeedPhone] = useState(false);
  const [needPhoneReason, setNeedPhoneReason] = useState("");
  const [description, setDescription] = useState("");
  const { mutateAsync, isPending } = useApplyPersonalNightStudyMutation();
  const toast = useToast();

  const validate = () => {
    if (needPhone && !needPhoneReason.trim()) return false;
    if (description.trim().length > 250 || description.trim().length < 10)
      return false;
    return true;
  };

  const init = () => {
    setStartAt(new Date());
    setEndAt(new Date());
    setPeriod("1");
    setNeedPhone(false);
    setNeedPhoneReason("");
    setDescription("");
  };

  const submit = async () => {
    if (!validate()) {
      toast.warning("필수 입력 필드를 모두 채워주세요.");
      return;
    }

    await mutateAsync({
      description,
      startAt: padDate(startAt),
      endAt: padDate(endAt),
      period: Number(period),
      needPhone,
      needPhoneReason: needPhone ? needPhoneReason : null,
    });

    init();
  };

  return {
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    period,
    setPeriod,
    needPhone,
    setNeedPhone,
    needPhoneReason,
    setNeedPhoneReason,
    description,
    setDescription,
    submit,
    isPending,
  };
};
