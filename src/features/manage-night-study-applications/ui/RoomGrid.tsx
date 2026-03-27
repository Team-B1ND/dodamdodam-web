import { useGetRoomsQuery } from "@/entities/night-study/queries";
import type { NightStudyRoom } from "@/entities/night-study/types";
import { FilledButton } from "@b1nd/dodam-design-system/components";
import { useRoomAssignment } from "../hooks/useRoomAssignment";

interface Props {
  applicationId: string;
  initialRoomId?: number;
  onClose: () => void;
}

const RoomGrid = ({ applicationId, initialRoomId, onClose }: Props) => {
  const { data } = useGetRoomsQuery();
  const rooms = data.data;

  const { selectedRoomId, setSelectedRoomId, handleConfirm, isPending } =
    useRoomAssignment(applicationId, initialRoomId);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-label text-text-tertiary">프로젝트 실 지정</span>
      <div className="grid grid-cols-2 gap-3">
        {rooms.map((room: NightStudyRoom) => (
          <label
            key={room.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="room"
              value={room.id}
              checked={selectedRoomId === room.id}
              onChange={() => setSelectedRoomId(room.id)}
              className="accent-primary-normal"
            />
            <div className="flex flex-col">
              <span className="text-body1 font-semibold text-text-primary">{room.name}</span>
              <span className="text-caption1 text-primary-normal">실 지정 가능</span>
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <FilledButton
          role="primary"
          size="medium"
          display="inline"
          disabled={selectedRoomId === undefined || isPending}
          onClick={() => handleConfirm(onClose)}
        >
          지정 완료
        </FilledButton>
      </div>
    </div>
  );
};

RoomGrid.Skeleton = () => (
  <div className="grid grid-cols-2 gap-3">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="skeleton h-10 rounded-medium" />
    ))}
  </div>
);

export default RoomGrid;
