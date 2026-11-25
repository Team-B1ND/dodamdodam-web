import QueryBoundary from "@/shared/ui/query-boundary";
import { useState } from "react";
import {
  getCurrentWeekendStudyDate,
  getDefaultPeriod,
} from "../constants/filter-items";
import AttendanceRoomDetail, {
  ATTENDANCE_DETAIL_COLUMNS,
} from "./AttendanceRoomDetail";
import AttendanceRoomList, { type AttendanceRoom } from "./AttendanceRoomList";
import WeekendTable from "./WeekendTable";

/** 심자 출석 체크처럼 실 목록에서 실을 고르면 그 실 학생들의 출석을 체크해요. */
const AttendanceCheckTable = () => {
  const date = getCurrentWeekendStudyDate();
  const [period, setPeriod] = useState(getDefaultPeriod);
  const [selectedRoom, setSelectedRoom] = useState<AttendanceRoom | null>(null);

  if (selectedRoom) {
    return (
      <QueryBoundary
        pendingFallback={
          <div className="flex grow flex-col gap-3">
            <div className="skeleton h-12 w-48 rounded-small" />
            <WeekendTable.Skeleton
              columns={ATTENDANCE_DETAIL_COLUMNS}
              rowHeight={72}
            />
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
    <QueryBoundary pendingFallback={<AttendanceRoomList.Skeleton />}>
      <AttendanceRoomList
        date={date}
        period={period}
        onPeriodChange={setPeriod}
        onSelectRoom={setSelectedRoom}
      />
    </QueryBoundary>
  );
};

export default AttendanceCheckTable;
