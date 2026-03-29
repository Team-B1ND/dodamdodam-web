import { useFixTeacherProfileMutation } from "@/entities/user/mutations";
import type { User } from "@/entities/user/types";
import { useState } from "react";

export const useFixTeacherProfile = (user: User) => {
  const [position, setPosition] = useState(user.teacher?.position ?? "");
  const { mutateAsync, isPending } = useFixTeacherProfileMutation();

  const isTeacher = true;
  const hasChanges = position.trim() !== (user.teacher?.position ?? "");

  const submit = async () => {
    if (!hasChanges) {
      return false;
    }

    await mutateAsync({
      position: position.trim() === (user.teacher?.position ?? "") ? null : position.trim(),
    });

    return true;
  };

  return {
    isTeacher,
    position,
    setPosition,
    hasChanges,
    submit,
    isPending,
  };
};
