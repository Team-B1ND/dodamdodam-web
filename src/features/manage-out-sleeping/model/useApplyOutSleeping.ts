import { useApplyOutSleepingMutation } from "@/entities/out-sleeping/mutations";
import { useApplyOutSleepingStore } from "@/features/manage-out-sleeping/stores/out-sleeping-apply";
import { padDate } from "@/shared/utils/pad-date";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState, type ChangeEvent } from "react";

export const useApplyOutSleeping = () => {
  const { applyData, setApplyData } = useApplyOutSleepingStore();

  const [startAt, setStartAt] = useState(new Date(applyData.startAt));
  const [endAt, setEndAt] = useState(new Date(applyData.endAt));
  const [reason, setReason] = useState(applyData.reason);
  const toast = useToast();
  const { mutateAsync, isPending } = useApplyOutSleepingMutation();

  const handleReason = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };

  const validate = () => {
    const errorMessage = []
    
    if (startAt.getTime() >= endAt.getTime()) {
      errorMessage.push("도착 일자는 출발 일자 이후여야 합니다.");
    };
    
    if (reason.trim().length === 0) {
      errorMessage.push("사유를 입력해주세요.")
    };

    return errorMessage
  }

  const init = () => {
    setStartAt(new Date());
    setEndAt(new Date());
    setReason("");
  }

  const submit = async () => {
    if (validate().length > 0) {
      toast.warning(validate().join(" 또한 "))
      return
    }

    await mutateAsync({
      startAt: padDate(startAt),
      endAt: padDate(endAt),
      reason
    });

    init();
  }

  const saveOnChangePage = () => {
    setApplyData({
      startAt: padDate(startAt),
      endAt: padDate(endAt),
      reason,
    });
  }

  return {
    startAt,
    endAt,
    setStartAt,
    setEndAt,
    reason,
    handleReason,
    submit,
    isPending,
    saveOnChangePage
  }
}
