import {
  useCreateWeekendStudyRoomMutation,
  useUpdateWeekendStudyRoomMutation,
} from "@/entities/weekend-study/mutations";
import type { WeekendStudyRoom } from "@/entities/weekend-study/types";
import { Dialog, TextField } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

interface Props {
  room?: WeekendStudyRoom;
  isOpen: boolean;
  onClose: () => void;
}

const RoomFormDialog = ({ room, isOpen, onClose }: Props) => {
  const [name, setName] = useState(room?.name ?? "");
  const [floor, setFloor] = useState(room ? String(room.floor) : "");
  const { mutate: create, isPending: isCreating } =
    useCreateWeekendStudyRoomMutation();
  const { mutate: update, isPending: isUpdating } =
    useUpdateWeekendStudyRoomMutation();
  const isPending = isCreating || isUpdating;
  const floorNumber = Number(floor);
  const isValid =
    name.trim().length > 0 && floor !== "" && Number.isInteger(floorNumber);

  const handleSubmit = () => {
    const payload = { name: name.trim(), floor: floorNumber };
    if (room) update({ id: room.id, ...payload }, { onSuccess: onClose });
    else create(payload, { onSuccess: onClose });
  };

  return (
    <Dialog
      open={isOpen}
      title={room ? "실 수정" : "실 추가"}
      onClose={onClose}
      closeOnDimmerClick
    >
      <div className="flex flex-col gap-3 w-full">
        <TextField
          type="text"
          label="실 이름"
          placeholder="예) LAB 13"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="text"
          inputMode="numeric"
          label="층"
          placeholder="예) 2"
          value={floor}
          onChange={(e) => setFloor(e.target.value.replace(/[^0-9]/g, ""))}
        />
        <div className="flex gap-2">
          <Dialog.FilledButton
            role="assistive"
            disabled={isPending}
            onClick={onClose}
          >
            취소
          </Dialog.FilledButton>
          <Dialog.FilledButton
            role="primary"
            disabled={isPending || !isValid}
            onClick={handleSubmit}
          >
            {room ? "수정" : "추가"}
          </Dialog.FilledButton>
        </div>
      </div>
    </Dialog>
  );
};

export default RoomFormDialog;
