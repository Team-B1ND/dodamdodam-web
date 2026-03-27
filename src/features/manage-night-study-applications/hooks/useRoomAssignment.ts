import { useAssignRoomMutation } from "@/entities/night-study/mutations";
import { useState } from "react";

export const useRoomAssignment = (applicationId: string, initialRoomId?: number) => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | undefined>(initialRoomId);
  const { mutate: assignRoom, isPending } = useAssignRoomMutation();

  const handleConfirm = (onClose: () => void) => {
    if (selectedRoomId === undefined) return;
    assignRoom({ id: applicationId, roomId: selectedRoomId }, { onSuccess: onClose });
  };

  return { selectedRoomId, setSelectedRoomId, handleConfirm, isPending };
};
