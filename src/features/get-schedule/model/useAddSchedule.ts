import { useAddScheduleMutation } from "@/entities/schedule/mutations";
import type { AddScheduleRequest } from "@/entities/schedule/types";
import { SCHEDULE_TARGET_ITEMS } from "@/features/get-schedule/constants/schedule-target";
import { useAddScheduleStore } from "@/features/get-schedule/stores/add-schedule";
import { padDate } from "@/shared/utils/pad-date";
import {
  useToast,
  type DropdownItem,
} from "@b1nd/dodam-design-system/components";
import { useState, type ChangeEvent } from "react";

export const useAddSchedule = () => {
  const { addScheduleData, setAddScheduleData } = useAddScheduleStore();
  const toast = useToast();
  const { mutateAsync, isPending } = useAddScheduleMutation();

  const [title, setTitle] = useState(addScheduleData.title);
  const [startAt, setStartAt] = useState(
    addScheduleData.startAt ? new Date(addScheduleData.startAt) : undefined,
  );
  const [endAt, setEndAt] = useState(
    addScheduleData.endAt ? new Date(addScheduleData.endAt) : undefined,
  );
  const [target, setTarget] = useState<DropdownItem>(addScheduleData.target);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const validate = () => {
    const errorMessages = [];
    const today = padDate(new Date());
    const startDate = startAt ? padDate(startAt) : "";
    const endDate = endAt ? padDate(endAt) : "";

    if (title.trim().length === 0) {
      errorMessages.push("일정명을 입력해주세요.");
    }

    if (!startAt) {
      errorMessages.push("시작 날짜를 선택해주세요.");
    }

    if (!endAt) {
      errorMessages.push("종료 날짜를 선택해주세요.");
    }

    if (!target) {
      errorMessages.push("대상을 선택해주세요.");
    }

    if (endDate && endDate < today) {
      errorMessages.push("종료 날짜는 오늘 이전일 수 없어요.");
    }

    if (startDate && endDate && endDate < startDate) {
      errorMessages.push("종료 날짜는 시작 날짜 이전일 수 없어요.");
    }

    return errorMessages;
  };

  const saveForm = () => {
    setAddScheduleData({
      title,
      startAt: startAt ? padDate(startAt) : undefined,
      endAt: endAt ? padDate(endAt) : undefined,
      target,
    });
  };

  const init = () => {
    setTitle("");
    setStartAt(undefined);
    setEndAt(undefined);
    setTarget(SCHEDULE_TARGET_ITEMS[0]);
    setAddScheduleData({
      title: "",
      target: SCHEDULE_TARGET_ITEMS[0],
    });
  };

  const submit = async () => {
    const errorMessages = validate();

    if (errorMessages.length > 0) {
      toast.warning(errorMessages.join(" 또한 "));
      return false;
    }

    if (!startAt || !endAt || !target) {
      return false;
    }

    const request: AddScheduleRequest = {
      title: title.trim(),
      startAt: padDate(startAt),
      endAt: padDate(endAt),
      targets: [target.value],
    };

    try {
      await mutateAsync(request);
      init();
      return true;
    } catch {
      return false;
    }
  };

  return {
    title,
    startAt,
    endAt,
    target,
    setStartAt,
    setEndAt,
    setTarget,
    handleTitle,
    saveForm,
    submit,
    isPending,
  };
};
