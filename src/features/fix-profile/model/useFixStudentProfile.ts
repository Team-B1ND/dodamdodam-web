import { useFixStudentProfileMutation } from "@/entities/user/mutations";
import type { User } from "@/entities/user/types";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

export const useFixStudentProfile = (user: User) => {
  const [grade, setGrade] = useState(String(user.student?.grade ?? 1));
  const [room, setRoom] = useState(String(user.student?.room ?? 1));
  const [number, setNumber] = useState(String(user.student?.number ?? 1));
  const toast = useToast();
  const { mutateAsync, isPending } = useFixStudentProfileMutation();

  const isStudent = user.roles.includes("STUDENT");
  const hasChanges =
    isStudent &&
    (grade !== String(user.student?.grade ?? 1) ||
      room !== String(user.student?.room ?? 1) ||
      number !== String(user.student?.number ?? 1));

  const validate = () => {
    if (!isStudent) {
      return [];
    }

    const errors: string[] = [];
    const parsedGrade = Number(grade);
    const parsedRoom = Number(room);
    const parsedNumber = Number(number);

    if (parsedGrade < 1 || parsedGrade > 3) {
      errors.push("학년은 1~3만 선택할 수 있습니다.");
    }

    if (parsedRoom < 1 || parsedRoom > 4) {
      errors.push("반은 1~4만 선택할 수 있습니다.");
    }

    if (parsedNumber < 1 || parsedNumber > 19) {
      errors.push("번호는 1~19만 선택할 수 있습니다.");
    }

    return errors;
  };

  const submit = async () => {
    if (!hasChanges) {
      return false;
    }

    const errors = validate();

    if (errors.length > 0) {
      toast.warning(errors.join(" 또한 "));
      return false;
    }

    await mutateAsync({
      grade: grade === String(user.student?.grade ?? 1) ? null : Number(grade),
      room: room === String(user.student?.room ?? 1) ? null : Number(room),
      number: number === String(user.student?.number ?? 1) ? null : Number(number),
    });

    return true;
  };

  return {
    isStudent,
    grade,
    room,
    number,
    setGrade,
    setRoom,
    setNumber,
    hasChanges,
    validate,
    submit,
    isPending,
  };
};
