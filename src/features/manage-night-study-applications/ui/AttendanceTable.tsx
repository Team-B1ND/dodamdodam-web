import type { AttendanceRoom } from "@/entities/night-study/types";
import { getToday } from "@/shared/libs/day";
import QueryBoundary from "@/shared/ui/query-boundary";
import { useState } from "react";
import AttendanceRoomDetail from "./AttendanceRoomDetail";
import AttendanceRoomList from "./AttendanceRoomList";
import AttendanceRoomListSkeleton from "./AttendanceRoomListSkeleton";
import AttendanceSkeletonRows from "./AttendanceSkeletonRows";

const AttendanceTable = () => {
  const date = getToday();
  const [period, setPeriod] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<AttendanceRoom | null>(null);

  if (selectedRoom) {
    return (
      <QueryBoundary
        pendingFallback={
          <div className="flex grow flex-col gap-3">
            <div className="skeleton h-12 w-48 rounded-small" />
            <AttendanceSkeletonRows count={8} />
          </div>
        }
      >
        <AttendanceRoomDetail
          date={date}
          period={period}
          room={selectedRoom}
          onBack={() => setSelectedRoom(null)}
        />
      </QueryBoundary>
    );
  }

  return (
    <QueryBoundary pendingFallback={<AttendanceRoomListSkeleton />}>
      <AttendanceRoomList
        date={date}
        period={period}
        onPeriodChange={setPeriod}
        onSelectRoom={setSelectedRoom}
      />
    </QueryBoundary>
  );
};

export default AttendanceTable;
